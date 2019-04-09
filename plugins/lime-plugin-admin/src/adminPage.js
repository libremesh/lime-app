import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { changeConfig, adminLogin } from './adminActions';
import { authStatus, loading } from './adminSelectors';
import { getSelectedHost } from '../../lime-plugin-core/src/metaSelectors';
import { getNodeData } from '../../lime-plugin-rx/src/rxSelectors';

import Loading from '../../../src/components/loading';

import I18n from 'i18n-js';

const style = {
	textLoading: {
		textAlign: 'center',
		display: 'block'
	},
	loadingBox: {
		position: 'fixed',
		marginTop: '30vh',
		zIndex: '5555',
		background: 'rgb(255, 255, 255)',
		width: '200px',
		top: '0px',
		left: 'calc(50% - 100px)',
		borderRadius: '11px',
		padding: '15px',
		boxShadow: '1px 1px 6px rgba(0,0,0,0.5)'
	},
	configBox: {
		marginBottom: '3rem',
		borderRadius: '5px',
		border: '1px solid #ccc',
		padding: '15px 15px 0 15px'
	}
};

const Input = ({ name, label, value, onChange }) =>
	(<div>
		<label>{I18n.t(label)}</label>
		<input type="text" value={value} onChange={onChange} class="u-full-width" />
	</div>
	);

export class Admin extends Component {

	handleInput(field) {
		return e => {
			this.setState({ data: { ...this.state.data, [field]: e.target.value } });
			return this.state.data[field];
		};
	}

	handlePassword(e) {
		this.setState({ adminPassword: e.target.value });
		return this.state.adminPassword;
	}

	adminLogin(e) {
		e.preventDefault();
		this.props.adminLogin({ username: 'root', password: this.state.adminPassword });
	}

	changeConfig(e) {
		e.preventDefault();
		if (typeof this.state.hostname !== 'undefined') {
			return this.props.changeConfig({ hostname: this.state.hostname, ip: this.state.ip });
		}
	}

	showLoading(show) {
		if (show) {
			return (
				<div style={style.loadingBox}>
					<Loading />
					<span style={style.textLoading}>{I18n.t('Applying changes. The system takes a minute to get back online.')}</span>
				</div>
			);
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			data: {
				hostname: this.props.selectedHost,
				ipv4: this.props.nodeData.ips.filter(ip => ip.version === '4')[0].address,
				ipv6: this.props.nodeData.ips.filter(ip => ip.version === '6')[0].address
			},
			isAdv: false
		};
		this.changeConfig = this.changeConfig.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.adminLogin = this.adminLogin.bind(this);
	}

	render() {
		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				{this.showLoading(this.props.loading)}
				<form onSubmit={this.adminLogin} style={{ display: (!this.props.authStatus)? 'block': 'none' }}>
					<p>
						<label>{I18n.t('Admin password')}</label>
						<input type="password" onChange={this.handlePassword} class="u-full-width" />

					</p>
					<button class="button green block" type="submit">{I18n.t('Login')}</button>
				</form>
				<form onSubmit={this.changeConfig} style={{ display: (this.props.authStatus)? 'block': 'none' }}>
					<div style={style.configBox}>
						<h4>{I18n.t('System')}</h4>
						<Input name={'hostname'} label={'Station name'} value={this.state.data.hostname} onChange={this.handleInput('hostname')} />
					</div>
					<div style={style.configBox}>
						<h4>{I18n.t('Network')}</h4>
						<Input name={'ipv4'} label={'Sation IP v4'} value={this.state.data.ipv4} onChange={this.handleInput('ipv4')} />
						<Input name={'ipv6'} label={'Sation IP v6'} value={this.state.data.ipv6} onChange={this.handleInput('ipv6')} />
					</div>
					<div style={style.configBox}>
						<h4>{I18n.t('Wireless')}</h4>
						<Input name={'ap_ssid'} label={'Access Point ESSID'} value={this.state.data.ap_ssid} onChange={this.handleInput('ap_ssid')} />
						<Input name={'channel_2ghz'} label={'Channel used for 2.4 GHz radios'} value={this.state.data.channel_2ghz} onChange={this.handleInput('channel_2ghz')} />
						<Input name={'channel_5ghz'} label={'Channel used for 5 GHz radios'} value={this.state.data.channel_5ghz} onChange={this.handleInput('channel_5ghz')} />
						<Input name={'country'} label={'Country code'} value={this.state.data.country} onChange={this.handleInput('country')} />
						<Input name={'distance'} label={'Max distance for the links in meters'} value={this.state.data.distance} onChange={this.handleInput('distance')} />
						<Input name={'mesh_bssid'} label={'WiFi mesh 	network identifier'} value={this.state.data.mesh_bssid} onChange={this.handleInput('mesh_bssid')} />
					</div>
					<button class="button green block" type="submit">{I18n.t('Change')}</button>
				</form>
			</div>
		);
	}
}


export const mapStateToProps = (state) => ({
	selectedHost: getSelectedHost(state),
	nodeData: getNodeData(state),
	authStatus: authStatus(state),
	loading: loading(state)
});

export const mapDispatchToProps = (dispatch) => ({
	changeConfig: bindActionCreators(changeConfig, dispatch),
	adminLogin: bindActionCreators(adminLogin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

