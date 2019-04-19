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
		if (this.state.scanning === true) return;

		this.setState({ scanning: true });
		this.loop = setInterval(() => {
			this.props.searchNetworks(false);
			if (this.props.status === 'scanned'){
				this.setState({ scanning: false });
				clearInterval(this.loop);
				return;
			}
		},5000);

		this.props.searchNetworks(this.props.status === 'scanned');
	}

	selectNetwork(e) {
		this.setState({ selectedNetwork: e.target.value });
	}

	setNetwork() {
		if (this.state.selectedNetwork && this.state.hostName && this.state.hostName !== '') {
			this.props.setNetwork({
				file: this.state.selectedNetwork,
				hostname: this.state.hostName
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
			scanning: false,
			createForm: false,
			error: null
		};
	}
	
	componentDidMount() {
		if (this.props.status !== 'scanned') this.searchNetworks();
	}

	componentWillUnmount(){
		if (this.loop) {
			clearInterval(this.loop);
		}
	}

	render () {
		return (
			<div>
				<div>
					{ this.props.networks && this.props.status === 'scanned' ? (
						<div>
							{this.props.networks.length === 0
								? <p>:( {I18n.t('No network found, try realigning your node and rescanning.')}</p>
								:<div class="container">
									<h4>{I18n.t('Join the mesh')}</h4>
									<label>{I18n.t('Select a network to join')}</label>
									<select onChange={this.selectNetwork}  class="u-full-width">
										<option disabled selected >{I18n.t('Select one')}</option>
										{this.props.networks.map(network => (<option value={network.file}>{network.ap}</option>))}
									</select>
									<label>{I18n.t('Choose a name for this node')}</label>
									<input type="text" placeholder={I18n.t('Host name')} class="u-full-width" onChange={this._changeName} />
									<div class="row">
										<div class="six columns">
											<button
												onClick={this.setNetwork}
												class="u-full-width"
											>
												{I18n.t('Set network')}
											</button>
										</div>
										<div class="six columns">
											<button
												button disabled={this.props.status === 'scanning'}
												onClick={this.searchNetworks}
												class="u-full-width"
											>
												{I18n.t('Rescan')}
											</button>
										</div>
										<button
											disabled={this.props.status === 'scanning'}
											onClick={this.props.toggleForm(null)}
											class="u-full-width"
										>
											{I18n.t('Cancel')}
										</button>
									</div>
								</div>
							}
						</div>
					): this.props.status === 'scanning' ? false : <Loading />}
					{ this.props.status === 'scanning'? (
						<Loading />
					): false }
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
	status: state.firstbootwizard.status
});

const mapDispatchToProps = (dispatch) => ({
	getStatus: bindActionCreators(getStatus, dispatch),
	searchNetworks: bindActionCreators(searchNetworks ,dispatch),
	setNetwork: bindActionCreators(setNetwork ,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Scan);