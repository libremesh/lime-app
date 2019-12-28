import { h } from 'preact';
import { useState } from 'preact/hooks';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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


export const Admin = ({ adminLogin, changeConfig, showNotification, selectedHost, nodeData, loading, authStatus }) => {
	const [ state, setState ] = useState({
		hostname: selectedHost,
		ip: nodeData.ips.filter(ip => ip.version === '4')[0].address
	});

	function handleHostname(e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value, end);
		setState({ ...state, hostname: e.target.value });
		return e;
	}

	function handleIp(e) {
		setState({ ...state, ip: e.target.value });
		return e;
	}

	function handlePassword(e) {
		setState({ ...state, adminPassword: e.target.value });
		return e;
	}

	function _adminLogin(e) {
		e.preventDefault();
		adminLogin({ username: 'root', password: state.adminPassword });
	}

	function _changeConfig(e) {
		e.preventDefault();
		if (isValidHostname(state.hostname, true)) {
			return changeConfig({ hostname: state.hostname, ip: state.ip });
		}
		showNotification('Invalid hostname, needs to be at least three characters long.');
	}

	function showLoading(show) {
		if (show) {
			return (
				<div style={style.loadingBox}>
					<Loading />
					<span style={style.textLoading}>{I18n.t('Applying changes. The system takes a minute to get back online.')}</span>
				</div>
			);
		}
	}

	return (
		<div class="container" style={{ paddingTop: '100px' }}>
			{showLoading(loading)}
			<form onSubmit={_adminLogin} style={{ display: (!authStatus)? 'block': 'none' }}>
				<p>
					<label>{I18n.t('Admin password')}</label>
					<input type="password" onInput={handlePassword} class="u-full-width" />

				</p>
				<button class="button green block" type="submit">{I18n.t('Login')}</button>
			</form>
			<form onSubmit={_changeConfig} style={{ display: (authStatus)? 'block': 'none' }}>
				<p>
					<label>{I18n.t('Station name')}</label>
					<input type="text" value={state.hostname} onInput={handleHostname} onChange={handleHostname} class="u-full-width" />
				</p>
				<p>
					<label>{I18n.t('Station IP v4')}</label>
					<input type="text" value={state.ip} onInput={handleIp} class="u-full-width" />
				</p>
				<button class="button green block" type="submit">{I18n.t('Change')}</button>
			</form>
		</div>
	);
};


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
