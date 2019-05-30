import { h, Component } from 'preact';

import '../style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { searchNetworks, setNetwork, getStatus } from '../actions';

import I18n from 'i18n-js';
import { Loading } from '../../../../src/components/loading';
import Alert from '../../../../src/components/alert';

class Scan extends Component {

	/* Load scan results */
	searchNetworks() {
		this.props.searchNetworks(true);
		this.loop = setInterval(() => {
			if (this.props.status === 'scanned'){
				console.log('scanned!!!');
				clearInterval(this.loop);
			}
			else {
				this.props.searchNetworks(false);
			}
		}, 5000);
	}

	/* Change state after selectbox change event */
	selectNetwork(event) {
		const { config, file } = this.props.networks[event.target.value];
		this.setState({
			file,
			apname: config.wifi.apname_ssid.split('/%H')[0],
			community: config.wifi.ap_ssid
		});
	}

	/* Validate state and set network in the router */
	setNetwork() {
		if (this.state.apname && this.state.hostname && this.state.hostname !== '') {
			this.props.setNetwork({
				file: this.state.file,
				hostname: this.state.hostname,
				network: this.state.community
			});
			this.props.toggleForm('setting')();
		}
		else {
			this.setState({
				error: true
			});
		}
	}

	/* Input to state function*/
	_changeName (e){
		this.setState({ hostname: e.target.value || '' });
	}

	/* Input to state function*/
	_changePassword (e){
		this.setState({ password: e.target.value || '' });
	}

	constructor(props){
		super(props);
		this.searchNetworks = this.searchNetworks.bind(this);
		this.selectNetwork = this.selectNetwork.bind(this);
		this.setNetwork = this.setNetwork.bind(this);
		this._changeName = this._changeName.bind(this);
		this._changePassword = this._changePassword.bind(this);

		this.state = {
			createForm: false,
			error: null,
			hostname: null
		};
	}
	
	componentDidMount() {
		if (this.props.status !== 'scanned') this.props.searchNetworks(false);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.hostname) {
			this.setState({
				hostname: nextProps.hostname
			});
		}
	}

	componentWillUnmount(){
		if (this.loop) {
			console.log('clena loop');
			clearInterval(this.loop);
		}
	}

	render () {
		return (
			<div>
				<div class="container" style={{ paddingTop: '100px' }}>
					<div>
						{ this.props.networks && this.props.status === 'scanned' ? (
							<div>
								<div class="container">
									{this.props.networks.length === 0 && <p>:( {I18n.t('No network found, try realigning your node and rescanning.')}</p>}
									{this.props.networks.length > 0 && <div>
										<h4>{I18n.t('Join the mesh')}</h4>
										<label>{I18n.t('Select a network to join')}</label>
										<select onChange={this.selectNetwork}  class="u-full-width">
											<option disabled selected>{I18n.t('Select one')}</option>
											{this.props.networks.map((network, key) => (<option value={key}>{network.ap+ ' ('+ network.config.wifi.ap_ssid +')'}</option>))}
										</select>
										<label>{I18n.t('Choose a name for this node')}</label>
										<input type="text" placeholder={I18n.t('Host name')} class="u-full-width" value={this.state.hostname} onChange={this._changeName} />
										{/* <label>{I18n.t('Choose a password for this node')}</label>
										<input type="text" placeholder={I18n.t('Password')} class="u-full-width" value={this.state.password} onChange={this._changePassword} /> */}
									</div>}
									<div class="row">
										{this.props.networks.length > 0 && <div class="six columns">
											<button
												onClick={this.setNetwork}
												class="u-full-width"
											>
												{I18n.t('Set network')}
											</button>
										</div>}
										<div class="six columns">
											<button
												onClick={this.searchNetworks}
												class="u-full-width"
											>
												{I18n.t('Rescan')}
											</button>
										</div>
										<button
											onClick={this.props.toggleForm(null)}
											class="u-full-width"
										>
											{I18n.t('Cancel')}
										</button>
									</div>
								</div>
							</div>
						): this.props.status === 'scanning' ? false : <Loading />}
						{ this.props.status === 'scanning'? (
							<Loading />
						): false }
					</div>
				</div>
				{this.state.error && <Alert text={I18n.t('Must select a network and a name')} />}
				{(this.props.status === 'scanning' && <Alert text={I18n.t('Scanning for existing networks')} />)}
			</div>
		);
	}
}


const mapStateToProps = (state) => ({
	logs: state.firstbootwizard.logs,
	networks: state.firstbootwizard.networks,
	status: state.firstbootwizard.status,
	hostname: state.meta.selectedHost
});

const mapDispatchToProps = (dispatch) => ({
	getStatus: bindActionCreators(getStatus, dispatch),
	searchNetworks: bindActionCreators(searchNetworks ,dispatch),
	setNetwork: bindActionCreators(setNetwork ,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Scan);