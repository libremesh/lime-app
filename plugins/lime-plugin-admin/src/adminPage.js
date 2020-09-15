import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeHostname } from './adminActions';
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


export const Admin = ({ changeHostname, showNotification, loading, redirect, error }) => {
	const { nodeHostname } = useAppContext();
	const [ hostname, setHostname ] = useState(nodeHostname);

	useEffect(() => {
		if (redirect) {
			window.location.href = 'http://'.concat(hostname);
		}
	}, [hostname, redirect]);

	function handleHostname(e) {
		const end = e.type === 'change';
		setHostname(slugify(e.target.value, end));
	}

	function _changeHostname(e) {
		e.preventDefault();
		if (isValidHostname(hostname, true)) {
			return changeHostname(hostname);
		}
		showNotification('Invalid hostname, needs to be at least three characters long.');
	}

	function showLoading(show) {
		if (show) {
			return (
				<div style={style.loadingBox}>
					<Loading />
					<span style={style.textLoading}>{I18n.t('Applying changes.')}</span>
				</div>
			);
		}
	}

	return (
		<div className="container container-padded">
			{showLoading(loading)}
			<form onSubmit={_changeHostname}>
				<p>
					<label>{I18n.t('Station name')}</label>
					<input type="text" value={hostname} onInput={handleHostname} className="u-full-width" />
				</p>
				<button className="button block" type="submit">{I18n.t('Change')}</button>
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
	changeHostname: bindActionCreators(changeHostname, dispatch),
	showNotification: bindActionCreators(showNotification, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
