import { h, Component } from 'preact';

import './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { searchNetworks, createNetwork, setNetwork, getStatus } from './actions';

import I18n from 'i18n-js';
import { Loading } from '../../../src/components/loading';
import Alert from '../../../src/components/alert';

class Page extends Component {

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
		this.props.setNetwork(this.state.selectedNetwork);
	}

	toggleForm() {
		this.setState({ createForm: !this.state.createForm });
	}

	_changeName (e){
		this.setState({ communityName: e.target.value || '' });
	}

	createNetwork(){
		this.props.createNetwork({ name: this.state.communityName });
		this.toggleForm();
	}

	constructor(props){
		super(props);
		this.searchNetworks = this.searchNetworks.bind(this);
		this.selectNetwork = this.selectNetwork.bind(this);
		this.setNetwork = this.setNetwork.bind(this);
		this.toggleForm = this.toggleForm.bind(this);
		this.createNetwork = this.createNetwork.bind(this);
		this._changeName = this._changeName.bind(this);

		this.state = {
			scanning: false,
			createForm: false
		};
	}

	componentWillUnmount(){
		if (this.loop) {
			clearInterval(this.loop);
		}
	}

	renderScan() {
		return (
			<div>
				<div class="container" style={{ paddingTop: '100px' }}>
					<h4><span>{I18n.t('Configure your network')}</span></h4>
					<p>{I18n.t('You can search for mesh networks around you to add or to create a new one.')}</p>
					{
					 this.props.status !== 'scanning'
					 ? (
								<div class="row">
									<div class="six columns">
										<button disabled={this.props.status === 'scanning'} onClick={this.searchNetworks} class="u-full-width">
											{ this.props.status === 'scanned' ? I18n.t('Rescan for existent networks') : I18n.t('Scan for existing networks') }
										</button>
									</div>
									<div class="six columns">
										<button onClick={this.toggleForm} class="u-full-width">
											{I18n.t('Create new network')}
										</button>
									</div>
								</div>
							)
					 : false
					}
					<br />
					{ this.props.networks && this.props.status === 'scanned' ? (
						<div>
							{this.props.networks.length === 0
								? <p>:( {I18n.t('No network found, try realigning your node and rescanning.')}</p>
								:<div>
									<h4>{I18n.t('Networks found:')}</h4>
									<select onChange={this.selectNetwork}  class="u-full-width">
										<option disabled selected >{I18n.t('Select one')}</option>
										{this.props.networks.map(network => (<option value={network.file}>{network.ap}</option>))}
									</select>
									<button
										disabled={typeof this.state.selectedNetwork === 'undefined'}
										onClick={this.setNetwork}
										class="u-full-width"
									>
										{I18n.t('Set network')}
									</button>
								</div>
							}
						</div>
					): false}
					{
						this.state.createForm? (
							<div />
						)
							:false
					}
					{ this.props.status === 'scanning'? (
						<Loading />
					): false }
				</div>
				{(this.props.status === 'scanning' && <Alert text={I18n.t('Scanning for existing networks')} />)}
			</div>
		);
	}

	renderForm() {
		return (<div class="container" style={{ paddingTop: '100px' }}>
			<h4><span>{I18n.t('Configure your new community network')}</span></h4>
			<input type="text" placeholder={I18n.t('Community name')} class="u-full-width" onChange={this._changeName} />
			<div class="row">
				<div class="six columns">
					<button
						class="u-full-width"
						disabled={!this.state.communityName || this.state.communityName === ''}
						onClick={this.createNetwork}
					>
						{I18n.t('Create network')}
					</button>
				</div>
				<div class="six-columns">
					<button
						class="u-full-width"
						onClick={this.toggleForm}
					>
						{I18n.t('Cancel')}
					</button>
				</div>
			</div>
		</div>);
	}

	render (){
		return	 !this.state.createForm
			? this.renderScan.bind(this)()
			: this.renderForm.bind(this)();
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
	setNetwork: bindActionCreators(setNetwork ,dispatch),
	createNetwork: bindActionCreators(createNetwork ,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);