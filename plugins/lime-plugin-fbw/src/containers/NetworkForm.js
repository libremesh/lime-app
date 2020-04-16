import { h } from 'preact';
import { useState } from 'preact/hooks';

import '../style';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createNetwork } from '../actions';

import I18n from 'i18n-js';
import { isValidHostname, slugify } from '../../../../src/utils/isValidHostname';

const StatusBox = ({value}) => (
	<b>
		{value ?
			(<span style={{ color: 'green' }}>✔</span>)
			:
			(<span style={{ color: 'red' }}>✘</span>)
		}
	</b>
)

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
			adminPassword: state.password,
		});
		toggleForm('setting')();
	}

	function _PasswordHasLength() {
		// Check there is at least 10 characters in the string
		return state.password.match("^(?=.{10,}$).*$")
	}

	function _PasswordHasNumber() {
		// Check there is at least one number in the string
		return state.password.match("^(?=.*[0-9]).*$")
	}

	function _PasswordHasAlphanumeric() {
		// Check there is at least one alphanumeric in the string
		return state.password.match("^(?=.*[a-zA-z]).*$")
	}
	function _isValidPassword() {
		return (
			_PasswordHasLength() &&
			_PasswordHasAlphanumeric() &&
			_PasswordHasNumber()
		);
	}

	function _passwordMatch() {
		return state.password === state.passwordConfirmation;
	}

	function _isValidForm() {
		return (
			_isValidPassword() &&
			_passwordMatch() &&
			isValidHostname(state.communityName, true) &&
			isValidHostname(state.hostName, true)
		)
	}

	return (<div class="container" style={{ paddingTop: '100px' }}>
		<h4><span>{I18n.t('Configure your new community network')}</span></h4>
		<label>{I18n.t('Choose a name for your network')}</label>
		<input type="text" placeholder={I18n.t('Community name')} class="u-full-width" onInput={_changeName} />
		<label>{I18n.t('Choose a shared password for network adminitration')}</label>
		<input type="password" placeholder={I18n.t('Password')} class="u-full-width" value={state.password} onInput={_changePassword} />
		<p>{I18n.t('The password should have:')}<br />
			<StatusBox value={_PasswordHasLength()} /> {I18n.t('More than 10 characters')}<br />
			<StatusBox value={_PasswordHasNumber()} /> {I18n.t('At least one number')}<br />
			<StatusBox value={_PasswordHasAlphanumeric()} /> {I18n.t('At least one alphanumeric character')}<br />
		</p>
		<label>{I18n.t('Re-enter the shared password')}</label>
		<input type="password" placeholder={I18n.t('Re-enter Password')} class="u-full-width" value={state.passwordConfirmation} onInput={_changePasswordConfirmation} />
		{state.passwordConfirmation && !_passwordMatch() &&
			<p>{I18n.t('The passwords do not match!')}</p>
		}
		<label>{I18n.t('Choose a name for this node')}</label>
		<input type="text" placeholder={I18n.t('Host name')} class="u-full-width" value={state.hostName} onInput={_changeHostName} />
		<div class="row">
			<div class="six columns">
				<button
					class="u-full-width"
					disabled={!_isValidForm()}
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
