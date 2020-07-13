/* eslint-disable react/sort-comp */
import { createContext, Component } from 'preact';
import { useContext } from 'preact/hooks';
import uhttpdService from './uhttpd.service';

const UNAUTH_SESSION_ID = '00000000000000000000000000000000';
const DEFAULT_TIMEOUT = 5000;
const DEFAULT_COMMUNITY_SETTINGS = {
	bad_signal: '-82',
	acceptable_loss: '20',
	bad_bandwidth: '1',
	good_signal: '-65',
	good_bandwidth: '5'
};

/** Context used to pass application wise data and services to nested components */
const AppContext = createContext();

class DisconnectedError extends Error {}

export class AppContextProvider extends Component {

	constructor(props) {
		super(props);
		const apiUrl = window.origin;
		this.loginAsRoot = this.loginAsRoot.bind(this);
		this.changeNode = this.changeNode.bind(this);
		this.cancelFbw = this.cancelFbw.bind(this);
		this.setMenuEnabled = this.setMenuEnabled.bind(this);
		this.state = {
			uhttpdService,
			apiUrl,
			nodeHostname: null,
			baseNodeHostname: null,
			connected: false,
			connectionFail: false,
			compatibilityError: false,
			unexpectedError: false,
			fbwConfigured: true,
			fbwCanceled: false,
			isRoot: false,
			communitySettings: {},
			menuEnabled: true,
			loginAsRoot: this.loginAsRoot,
			changeNode: this.changeNode,
			cancelFbw: this.cancelFbw,
			setMenuEnabled: this.setMenuEnabled
		};
		this.initialState = this.state;
		uhttpdService.setUrl(apiUrl);
	}

	componentDidMount(){
		this._bootstrapContext();
	}

	componentDidUpdate(_prevProps, prevState){
		if (this.state.apiUrl !== prevState.apiUrl){
			this._bootstrapContext(true);
		}
	}

	_bootstrapContext(isNodeChange=false) {
		this.state.uhttpdService.setUrl(this.state.apiUrl);
		this._login('lime-app', 'generic')
			.then(response => {
				this.setState({ connected: true, connectionFail: false });
			})
			.catch(error => {
				this.setState({ connected: false, connectionFail: true });
				throw new DisconnectedError();
			})
			.then(() => Promise.all([
				this._fetchNodeData(),
				this._fetchCommunitySettings(),
				this._fetchFBWStatus()]))
			.then(([nodeData, communitySettings, fbwStatus]) => {
				this.setState({
					nodeHostname: nodeData.hostname,
					// If it is the first visited node, set it as base node
					baseNodeHostname: this.state.baseNodeHostname || nodeData.hostname,
					communitySettings: { ...DEFAULT_COMMUNITY_SETTINGS, ...communitySettings },
					fbwConfigured: !fbwStatus.lock
				});
			})
			.catch(error => {
				if (error instanceof DisconnectedError) return;
				if (isNodeChange){
					// It may be a compatibility error
					this.setState({ compatibilityError: true });
				}
				else {
					console.error(error);
					this.setState({ unexpectedError: true });
				}
			});

	}

	_fetchNodeData() {
		return this.state.uhttpdService.call('system', 'board', {}).toPromise();
	}

	_fetchCommunitySettings() {
		return this.state.uhttpdService.call('lime-utils', 'get_community_settings', {}).toPromise()
			.catch(error => Promise.resolve(DEFAULT_COMMUNITY_SETTINGS));
	}

	_fetchFBWStatus() {
		return this.state.uhttpdService.call('lime-fbw', 'status', {}).toPromise();
	}

	_login(username, password) {
		const observable = this.state.uhttpdService.call('session', 'login',
			{ username, password, timeout: DEFAULT_TIMEOUT }, UNAUTH_SESSION_ID);
		return observable.toPromise()
			.then(response =>
				new Promise((res, rej) => {
					if (response.ubus_rpc_session) {
						this.state.uhttpdService.setSid(response.ubus_rpc_session);
						res(response);
					}
					else {
						rej(response);
					}
				}));
	}


	/** Passed down throw app context to allow components to login as root */
	loginAsRoot(password) {
		return this._login('root', password)
			.then(res => this.setState({ isRoot: true }));
	}

	/** Passed down throw app context to allow components to change current node */
	changeNode(hostname) {
		const apiUrl = 'http://' + hostname;
		this.setState(prevState => ({
			...this.initialState,
			baseNodeHostname: prevState.baseNodeHostname,
			apiUrl
		}));
	}

	cancelFbw() {
		this.setState({ fbwCanceled: true });
	}

	setMenuEnabled(value) {
		this.setState({ menuEnabled: value });
	}

	render () {
		return (
			<AppContext.Provider value={this.state}>
				{this.props.children}
			</AppContext.Provider>
		);
	}
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error('AppContext must be used within an AppContextProvider');
	}
	return context;
}
