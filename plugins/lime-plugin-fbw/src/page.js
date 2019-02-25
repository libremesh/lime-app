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
			<div class="container" style={{ paddingTop: '100px' }}>
				<h4><span>{I18n.t('Configure your network')}</span></h4>
				{
					 this.props.status !== 'scanning'
					 ? (<button disabled={this.props.status === 'scanning'} onClick={this.searchNetworks} style={{ width: '100%' }}>
							{ this.props.status === 'scanned' ? I18n.t('Rescan for existent networks') : I18n.t('Scan for existent networks') }
						</button>)
					 : false
				}
				<br />
				{ this.props.networks && this.props.status === 'scanned' ? (
					<div>
						<select onChange={this.selectNetwork}  style={{ width: '100%' }}>
							<option disabled selected >{I18n.t('Select one')}</option>
							{this.props.networks.map(network => (<option value={network.file}>{network.ap}</option>))}
						</select>
						<button
							style={{ width: '48%', margin: '0 4% 0 0' }}
							disabled={typeof this.state.selectedNetwork === 'undefined'}
							onClick={this.setNetwork}
						>
							{I18n.t('Set network')}
						</button>
						<button
							style={{ width: '48%' }}
							onClick={this.toggleForm}
						>
							{I18n.t('Create new network')}
						</button>
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
				{(this.props.status === 'scanning' && <Alert text={I18n.t('Scan for existent networks')} />)}
			</div>
		);
	}

	renderForm() {
		return (<div class="container" style={{ paddingTop: '100px' }}>
			<h4><span>{I18n.t('Configure your new community network')}</span></h4>
			<input type="text" placeholder={I18n.t('Community name')} class="u-full-width" onChange={this._changeName} />
			<button
				style={{ width: '48%', margin: '0 4% 0 0' }}
				disabled={!this.state.communityName || this.state.communityName === ''}
				onClick={this.createNetwork}
			>
				{I18n.t('Create network')}
			</button>
			<button
				style={{ width: '48%' }}
				onClick={this.toggleForm}
			>
				{I18n.t('Cancel')}
			</button>
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