import { h, Component } from 'preact';

import './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { searchNetworks, createNetwork, setNetwork } from './actions';

import I18n from 'i18n-js';
import { Loading } from '../../../src/components/loading';
import Alert from '../../../src/components/alert';

class Page extends Component {

	searchNetworks() {
		this.loop = setInterval(() => {
			if (this.props.status === 'scanned'){
				clearInterval(this.loop);
				return;
			}
			this.props.searchNetworks(this.props.status === 'scanned');
		},1000);
	}

	selectNetwork(e) {
		this.setState({ selectedNetwork: e.target.value });
	}

	setNetwork() {
		this.props.setNetwork(this.state.selectedNetwork);
	}

	constructor(props){
		super(props);
		this.searchNetworks = this.searchNetworks.bind(this);
		this.selectNetwork = this.selectNetwork.bind(this);
		this.setNetwork = this.setNetwork.bind(this);
	}

	componentWillUnmount(){
		if (this.loop) {
			clearInterval(this.loop);
		}
	}

	render (){
		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				<h4><span>{I18n.t('Configure your network')}</span></h4>
				<button disabled={this.props.status === 'scanning'} onClick={this.searchNetworks}>
					{(this.props.status === 'scanned') ? I18n.t('Rescan for existent networks') : I18n.t('Scan for existent networks') }

				</button><br />
				{ this.props.networks && this.props.status === 'scanned' ? (
					<div>
						<select onChange={this.selectNetwork}>
							<option disabled selected >Select one</option>
							{this.props.networks.map(network => (<option value={network.file}>{network.ap}</option>))}
						</select>
						<button
							disabled={typeof this.state.selectedNetwork === 'undefined'}
							onClick={this.setNetwork}
						>
							Set network
						</button>
					</div>
				): false}
				{ this.props.status === 'scanning'? (
					<Loading />
				): false }
				{(this.props.status === 'scanning' && <Alert text={I18n.t('Scan for existent networks')} />)}
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
	searchNetworks: bindActionCreators(searchNetworks ,dispatch),
	setNetwork: bindActionCreators(setNetwork ,dispatch),
	createNetwork: bindActionCreators(createNetwork ,dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);