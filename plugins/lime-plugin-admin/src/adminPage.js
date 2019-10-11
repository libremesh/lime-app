import { h, Component } from 'preact';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { changeConfig, adminLogin } from './adminActions';
import { authStatus, loading } from './adminSelectors';
import { getSelectedHost } from '../../lime-plugin-core/src/metaSelectors';
import { getNodeData } from '../../lime-plugin-rx/src/rxSelectors';

import Loading from '../../../src/components/loading';

import I18n from 'i18n-js';
import { isValidHostname, slugify } from '../../../src/utils/isValidHostname';
import { showNotification } from '../../../src/store/actions';

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
	}
};

export class Admin extends Component {

	handleHostname(e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value, end);
		this.setState({ hostname: e.target.value });
		return e;
	}

	handleIp(e) {
		this.setState({ ip: e.target.value });
		return e;
	}

	handlePassword(e) {
		this.setState({ adminPassword: e.target.value });
		return e;
	}

	adminLogin(e) {
		e.preventDefault();
		this.props.adminLogin({ username: 'root', password: this.state.adminPassword });
	}

	changeConfig(e) {
		e.preventDefault();
		if (isValidHostname(this.state.hostname, true)) {
			return this.props.changeConfig({ hostname: this.state.hostname, ip: this.state.ip });
		}
		this.props.showNotification('Invalid hostname, needs to be at least three characters long.');
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
			hostname: this.props.selectedHost,
			ip: this.props.nodeData.ips.filter(ip => ip.version === '4')[0].address
		};
		this.changeConfig = this.changeConfig.bind(this);
		this.handleHostname = this.handleHostname.bind(this);
		this.handleIp = this.handleIp.bind(this);
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
						<input type="password" onInput={this.handlePassword} class="u-full-width" />

					</p>
					<button class="button green block" type="submit">{I18n.t('Login')}</button>
				</form>
				<form onSubmit={this.changeConfig} style={{ display: (this.props.authStatus)? 'block': 'none' }}>
					<p>
						<label>{I18n.t('Station name')}</label>
						<input type="text" value={this.state.hostname} onInput={this.handleHostname} onChange={this.handleHostname} class="u-full-width" />
					</p>
					<p>
						<label>{I18n.t('Station IP v4')}</label>
						<input type="text" value={this.state.ip} onInput={this.handleIp} class="u-full-width" />
					</p>
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
	adminLogin: bindActionCreators(adminLogin, dispatch),
	showNotification: bindActionCreators(showNotification, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

