import { h } from 'preact';
import I18n from 'i18n-js';

import { useState } from 'preact/hooks';

import { api } from '../../../src/store';
import { setSharedPassword, login } from './netAdminApi';

import { isValidPassword, ValidationMessages } from '../../../src/containers/SharedPasswordForm';
import Loading from '../../../src/components/loading';

const loadingBoxStyle = {
	position: 'fixed',
	marginTop: '30vh',
	zIndex: '5555',
	background: 'rgb(255, 255, 255)',
	width: '200px',
	top: '0px',
	left: 'calc(50% - 100px)',
	borderRadius: '11px',
	padding: '15px',
	boxShadow: '1px 1px 6px rgba(0,0,0,0.5)',
	textAlign: 'center'
};

const successMessageStyle = {
	backgroundColor: '#ffffff',
	border: '1px solid #96e362',
	textAlign: 'center',
}

const NOT_LOGGED_SESSION_ID = '00000000000000000000000000000000';

export const _NetAdminLogged = ({ submitting, success, submitSharedPassword }) => {
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	function changePassword(e) {
		setPassword(e.target.value || '');
	}

	function changePasswordConfirmation(e) {
		setPasswordConfirmation(e.target.value || '');
	}

	function isValidForm() {
		return isValidPassword(password) && (password === passwordConfirmation);
	}

	function _submitSharedPassword(password) {
		submitSharedPassword(password)
			.then(() => {
				setPassword('');
				setPasswordConfirmation('');
			})
	}

	return (
		<div class="container" style="padding-top: 100px;">
			<h4>{I18n.t('Change Shared Password')}</h4>
			<label>{I18n.t('Choose a shared password for network adminitration')}</label>
			<input type="password" placeholder={I18n.t('Password')} class="u-full-width"
				value={password} onInput={changePassword} />
			<ValidationMessages password={password}></ValidationMessages>
			<label>{I18n.t('Re-enter the shared password')}</label>
			<input type="password" placeholder={I18n.t('Re-enter Password')} class="u-full-width"
				value={passwordConfirmation} onInput={changePasswordConfirmation} />
			{passwordConfirmation && password !== passwordConfirmation &&
				<p>{I18n.t('The passwords do not match!')}</p>
			}
			<div>
				<button className="button green block"
					onClick={() => _submitSharedPassword(password)} disabled={!isValidForm()}>
					{I18n.t('Change')}
				</button>
			</div>
			{submitting &&
				<div style={loadingBoxStyle}>
					<Loading></Loading>
					{I18n.t('Setting up new password')}
				</div>
			}
			{success &&
				<div style={successMessageStyle}>
					{I18n.t('Shared Password changed successfully')}
				</div>
			}
		</div>
	)
}

const NetAdminLogged = ({ submitSharedPassword }) => {
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	function _submitSharedPassword(password) {
		setSubmitting(true);
		return submitSharedPassword(password)
			.then(() => setSuccess(true))
			.finally(() => setSubmitting(false))
	}

	return <_NetAdminLogged submitting={submitting} success={success}
		submitSharedPassword={_submitSharedPassword}></_NetAdminLogged>
}

export const _NetAdminLogin = ({ submitting, error, submitLogin }) => {
	const [password, setPassword] = useState('');
	const [showHelp, setShowHelp] = useState('');

	function toogleHelp(e) {
		e.preventDefault();
		setShowHelp(prevValue => !prevValue);
	}

	function changePassword(e) {
		setPassword(e.target.value || '');
	}

	return (
		<div className="container" style="padding-top: 100px;">
			<h3>{I18n.t('Wellcome to the Network Configuration')}</h3>
			<p>{I18n.t('Login with the shared password to start configuring your mesh network')}</p>
			<label htmlFor="password">Shared Password</label>
			<input name="password" type="password" value={password} onInput={changePassword} />
			{error &&
				<p>{I18n.t("Wrong password, try again")}</p>
			}
			<div>
				<button onClick={() => submitLogin(password)}>{I18n.t("Login")}</button>
			</div>
			<a href="#" onClick={toogleHelp}>{I18n.t("I don't know the shared password")}</a>
			{showHelp &&
				<p>{I18n.t("The shared password has been chosen by the community when the network was created. You can ask other community members for it.")}</p>
			}
			{submitting &&
				<div style={loadingBoxStyle}>
					<Loading></Loading>
					{I18n.t("Logging in")}
				</div>
			}
		</div>
	);
}

const NetAdminLogin = ({ submitLogin }) => {
	const [submitting, setSubmitting] = useState('');
	const [error, setError] = useState('');

	const _submitLogin = (password) => {
		setSubmitting(true);
		submitLogin(password)
			.catch(() => {
				setError(true);
			})
			.finally(() => { setSubmitting(false) })
	}
	return <_NetAdminLogin submitting={submitting} error={error} submitLogin={_submitLogin}></_NetAdminLogin>
}

const NetAdmin = () => {
	const [sessionId, setSessionId] = useState(NOT_LOGGED_SESSION_ID);

	const submitLogin = (password) => {
		return login(api, sessionId, password).toPromise()
			.then(sid => setSessionId(sid))
	}

	const submitSharedPassword = (password) => {
		return setSharedPassword(api, sessionId, password).toPromise()
	}

	if (sessionId !== NOT_LOGGED_SESSION_ID) {
		return <NetAdminLogged submitSharedPassword={submitSharedPassword} />
	} else {
		return <NetAdminLogin submitLogin={submitLogin} />
	}
}

export default NetAdmin;
