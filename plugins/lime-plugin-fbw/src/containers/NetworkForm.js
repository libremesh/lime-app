import { h } from 'preact';
import { useState } from 'preact/hooks';

import '../style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createNetwork } from '../actions';

import I18n from 'i18n-js';
import { isValidHostname, slugify } from '../../../../src/utils/isValidHostname';

export const NetworkForm = ({ createNetwork, toggleForm }) => {
	const [state, setState] = useState({
		communityName: '',
		hostName: '',
		password: '',
		passwordConfirmation: '',
	});

	function _changeName(e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value.toLocaleLowerCase(), end, true);
		setState({ ...state, communityName: e.target.value || '' });
		return e;
	}

	function _changeHostName(e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value, end);
		setState({ ...state, hostName: e.target.value || '' });
		return e;
	}

	function _changePassword(e) {
		setState({ ...state, password: e.target.value || '' });
		return e;
	}

	function _changePasswordConfirmation(e) {
		setState({ ...state, passwordConfirmation: e.target.value || '' });
		return e;
	}

	function _createNetwork() {
		createNetwork({
			network: state.communityName,
			hostname: state.hostName,
			password: state.password,
		});
		toggleForm('setting')();
	}

	function _isValidPassword() {
		return state.password.length > 0;
	}

	function _passwordMissMatch() {
		return state.password && state.passwordConfirmation && state.password !== state.passwordConfirmation;
	}

	return (<div class="container" style={{ paddingTop: '100px' }}>
		<h4><span>{I18n.t('Configure your new community network')}</span></h4>
		<label>{I18n.t('Choose a name for your network')}</label>
		<input type="text" placeholder={I18n.t('Community name')} class="u-full-width" onInput={_changeName} />
		<label>{I18n.t('Choose a shared password for network adminitration')}</label>
		<input type="password" placeholder={I18n.t('Password')} class="u-full-width" value={state.password} onInput={_changePassword} />
		<label>{I18n.t('Re-enter the shared password')}</label>
		<input type="password" placeholder={I18n.t('Re-enter Password')} class="u-full-width" value={state.passwordConfirmation} onInput={_changePasswordConfirmation} />
		{_passwordMissMatch() &&
			<label>{I18n.t('The passwords do not match!')}</label>
		}
		<label>{I18n.t('Choose a name for this node')}</label>
		<input type="text" placeholder={I18n.t('Host name')} class="u-full-width" value={state.hostName} onInput={_changeHostName} />
		<div class="row">
			<div class="six columns">
				<button
					class="u-full-width"
					disabled={!_isValidPassword() || _passwordMissMatch() || !isValidHostname(state.communityName, true) || !isValidHostname(state.hostName, true)}
					onClick={_createNetwork}
				>
					{I18n.t('Create network')}
				</button>
			</div>
			<div class="six columns">
				<button
					class="u-full-width"
					onClick={toggleForm(null)}
				>
					{I18n.t('Cancel')}
				</button>
			</div>
		</div>
	</div>);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
	createNetwork: bindActionCreators(createNetwork, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(NetworkForm);
