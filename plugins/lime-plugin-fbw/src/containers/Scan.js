import { h, Component } from 'preact';

import '../style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { searchNetworks, setNetwork, getStatus } from '../actions';

import I18n from 'i18n-js';
import { Loading } from '../../../../src/components/loading';
import Alert from '../../../../src/components/alert';

class Scan extends Component {

	searchNetworks() {
		this.props.searchNetworks(true);
		this.loop = setInterval(() => {
			if (this.props.status === 'scanned'){
				clearInterval(this.loop);
			}
			else {
				this.props.searchNetworks(false);
			}
		}, 5000);
	}

	selectNetwork(e) {
		const selectedNetwork = e.target.value.split(':::')[0];
		const reg = /\(([^()]+)\)/g;
		const network = reg.exec(e.target.value.split(':::')[1])[1];
		this.setState({
			selectedNetwork,
			network
		});
	}

	setNetwork() {
		if (this.state.selectedNetwork && this.state.hostName && this.state.hostName !== '') {
			this.props.setNetwork({
				file: this.state.selectedNetwork,
				hostname: this.state.hostName,
				network: this.state.network
			});
			this.props.toggleForm('setting')();
		}
		else {
			this.setState({
				error: true
			});
		}
	}

	_changeName (e){
		this.setState({ hostName: e.target.value || '' });
	}

	constructor(props){
		super(props);
		this.searchNetworks = this.searchNetworks.bind(this);
		this.selectNetwork = this.selectNetwork.bind(this);
		this.setNetwork = this.setNetwork.bind(this);
		this._changeName = this._changeName.bind(this);

		this.state = {
			createForm: false,
			error: null,
			hostName: null
		};
	}
	
	componentDidMount() {
		if (this.props.status !== 'scanned') this.props.searchNetworks(false);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.hostname) {
			this.setState({
				hostName: nextProps.hostname
			});
		}
	}

	componentWillUnmount(){
		if (this.loop) {
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
											{this.props.networks.map(network => (<option value={network.file+':::'+network.ap}>{network.ap}</option>))}
										</select>
										<label>{I18n.t('Choose a name for this node')}</label>
										<input type="text" placeholder={I18n.t('Host name')} class="u-full-width" value={this.state.hostName} onChange={this._changeName} />
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