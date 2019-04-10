import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { changeConfig, adminLogin } from './adminActions';
import { authStatus, wireless, channels, loading } from './adminSelectors';
import { getSelectedHost } from '../../lime-plugin-core/src/metaSelectors';
import { getNodeData } from '../../lime-plugin-rx/src/rxSelectors';

import Loading from '../../../src/components/loading';
import countryList from './countryList';

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

const Input = ({ name, label, value, onChange }) => (
	<div>
		<label>{I18n.t(label)}</label>
		<input type="text" value={value} onChange={onChange} class="u-full-width" />
	</div>
);

const Select = ({ name, label, value, onChange, children }) => (
	<div>
		<label>{I18n.t(label)}</label>
		<select value={value} onChange={onChange} class="u-full-width">
			{children}
		</select>
	</div>
);

export class Admin extends Component {
	state = {
		data: {
			hostname: '',
			ipv4: '',
			ipv6: ''
		},
		isAdv: false
	}

	handleInput = field => e => {
		console.log('field', field, e.target.value);
		this.setState({ [field]: e.target.value });
	}

	adminLogin = (e) => {
		e.preventDefault();
		this.props.adminLogin({ username: 'root', password: this.state.password });
	}

	changeConfig = (e) => {
		const { hostname, ip } = this.state;
		e.preventDefault();
		if (typeof hostname !== 'undefined') {
			this.props.changeConfig({ hostname, ip });
		}
	}

	showLoading = (show) => {
		if (show) {
			return (
				<div style={style.loadingBox}>
					<Loading />
					<span style={style.textLoading}>{I18n.t('Applying changes. The system takes a minute to get back online.')}</span>
				</div>
			);
		}
	}
	componentWillReceiveProps(nextProps) {
		// console.log('new', nextProps, nextProps === this.props)
		const { wireless, selectedHost, nodeData } = nextProps;
		const isEmpty = Object.entries(wireless).length === 0 && wireless.constructor === Object;
		if (nextProps !== this.props) {
			if (nodeData.ips) {
				this.setState({
					data: {
						hostname: selectedHost,
						ipv4: nodeData.ips.filter(ip => ip.version === '4')[0].address,
						ipv6: nodeData.ips.filter(ip => ip.version === '6')[0].address
					}
				});
			}
			if (!isEmpty) {
				const { ap_ssid, channel_2ghz, channel_5ghz, distance_2ghz, distance_5ghz, mesh_id, country } = wireless;
				this.setState({
					ap_ssid,
					channel_2ghz,
					channel_5ghz,
					distance_2ghz,
					distance_5ghz,
					mesh_id,
					country
				});
			}
		}
	}

	render() {
		console.log(this.props)
		const { password, ap_ssid, distance_2ghz, distance_5ghz, mesh_id, country } = this.state;
		const { hostname, ipv4, ipv6 } = this.state.data;
		const { channels } = this.props;
		return (
			<div class="container" style={{ paddingTop: '100px' }}>
				{this.showLoading(this.props.loading)}
				<form onSubmit={this.adminLogin} style={{ display: (!this.props.authStatus)? 'block': 'none' }}>
					<p>
						<label>{I18n.t('Admin password')}</label>
						<input type="password" onChange={this.handleInput('password')} value={password} class="u-full-width" />
					</p>
					<button class="button green block" type="submit">{I18n.t('Login')}</button>
				</form>
				<form onSubmit={this.changeConfig} style={{ display: (this.props.authStatus)? 'block': 'none' }}>
					<div style={style.configBox}>
						<h4>{I18n.t('System')}</h4>
						<Input name={'hostname'} label={'Station name'} value={hostname} onChange={this.handleInput('hostname')} />
					</div>
					<div style={style.configBox}>
						<h4>{I18n.t('Network')}</h4>
						<Input name={'ipv4'} label={'Sation IP v4'} value={ipv4} onChange={this.handleInput('ipv4')} />
						<Input name={'ipv6'} label={'Sation IP v6'} value={ipv6} onChange={this.handleInput('ipv6')} />
					</div>
					<div style={style.configBox}>
						<h4>{I18n.t('Wireless')}</h4>
						<Input name={'ap_ssid'} label={'Access Point ESSID'} value={ap_ssid} onChange={this.handleInput('ap_ssid')} />
						{channels.map(i => (
							<Select
								key={i.type}
								name={`channel_${i.type}`}
								label={`Channel used for ${i.type} radios`}
								value={this.state[`channel_${i.type.indexOf('2') !== -1 ? '2ghz' : i.type}`]}
								onChange={this.handleInput(`channel_${i.channel}`)}
							>
								{i.channel.map(e => <option key={e}>{e}</option>)}
							</Select>))}
						<Select name={'country'} onChange={this.handleInput('country')} label={'Country code'} value={country}>
							{Object.keys(countryList).map(k => <option key={k} value={k}>{countryList[k]} ({k})</option>)}
						</Select>
						<Input name={'distance'} label={'Max distance for the links in meters'} value={distance_2ghz} onChange={this.handleInput('distance_2ghz')} />
						<Input name={'distance'} label={'Max distance for the links in meters'} value={distance_5ghz} onChange={this.handleInput('distance_5ghz')} />
						<Input name={'mesh_bssid'} label={'WiFi mesh 	network identifier'} value={mesh_id} onChange={this.handleInput('mesh_id')} />
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
	wireless: wireless(state),
	channels: channels(state),
	loading: loading(state)
});

export const mapDispatchToProps = (dispatch) => ({
	changeConfig: bindActionCreators(changeConfig, dispatch),
	adminLogin: bindActionCreators(adminLogin, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

