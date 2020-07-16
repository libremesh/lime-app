import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeConfig } from './adminActions';
import { loading, redirect, error } from './adminSelectors';
import { getNodeData } from '../../lime-plugin-rx/src/rxSelectors';

import Loading from '../../../src/components/loading';

import I18n from 'i18n-js';
import { isValidHostname, slugify } from '../../../src/utils/isValidHostname';
import { showNotification } from '../../../src/store/actions';
import { useAppContext } from '../../../src/utils/app.context';

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


export const Admin = ({ changeConfig, showNotification, nodeData, loading, redirect, error }) => {
	const { nodeHostname, changeNode } = useAppContext();
	const [ state, setState ] = useState({
		hostname: nodeHostname,
		ip: nodeData.ips.filter(ip => ip.version === '4')[0].address
	});

	useEffect(() => {
		if (redirect) {
			setTimeout(() => {
				changeNode(state.hostname);
			}, 60000);
		}
	}, [state.hostname, redirect, changeNode]);

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
		<div className="container container-padded">
			{showLoading(loading)}
			<form onSubmit={_changeConfig}>
				<p>
					<label>{I18n.t('Station name')}</label>
					<input type="text" value={state.hostname} onInput={handleHostname} onChange={handleHostname} className="u-full-width" />
				</p>
				<p>
					<label>{I18n.t('Station IP v4')}</label>
					<input type="text" value={state.ip} onInput={handleIp} className="u-full-width" />
				</p>
				<button className="button green block" type="submit">{I18n.t('Change')}</button>
			</form>
			{error && I18n.t('An error occurred')}
		</div>
	);
};


export const mapStateToProps = (state) => ({
	nodeData: getNodeData(state),
	loading: loading(state),
	redirect: redirect(state),
	error: error(state)
});

export const mapDispatchToProps = (dispatch) => ({
	changeConfig: bindActionCreators(changeConfig, dispatch),
	showNotification: bindActionCreators(showNotification, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
