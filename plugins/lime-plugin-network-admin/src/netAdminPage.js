import { h } from 'preact';
import I18n from 'i18n-js';

import { useState } from 'preact/hooks';

import { useAppContext } from '../../../src/utils/app.context';

import { isValidPassword, ValidationMessages } from '../../../src/containers/SharedPasswordForm';
import Loading from '../../../src/components/loading';

import style from './style';

export const NetAdmin = ({ submitting, success, submitSharedPassword }) => {
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

	function _submitSharedPassword() {
		submitSharedPassword(password)
			.then(() => {
				setPassword('');
				setPasswordConfirmation('');
			});
	}

	return (
		<div class="container container-padded">
			<h4>{I18n.t('Change Shared Password')}</h4>
			<label>{I18n.t('Choose a shared password for network adminitration')}</label>
			<input type="password" placeholder={I18n.t('Password')} class="u-full-width"
				value={password} onInput={changePassword}
			/>
			<ValidationMessages password={password} />
			<label>{I18n.t('Re-enter the shared password')}</label>
			<input type="password" placeholder={I18n.t('Re-enter Password')} class="u-full-width"
				value={passwordConfirmation} onInput={changePasswordConfirmation}
			/>
			{passwordConfirmation && password !== passwordConfirmation &&
				<p>{I18n.t('The passwords do not match!')}</p>
			}
			<div>
				<button className="button block"
					onClick={_submitSharedPassword} disabled={!isValidForm()}
				>
					{I18n.t('Change')}
				</button>
			</div>
			{submitting &&
				<div className={style.loadingBox}>
					<Loading />
					{I18n.t('Setting up new password')}
				</div>
			}
			{success &&
				<div className={style.successMessage}>
					{I18n.t('Shared Password changed successfully')}
				</div>
			}
		</div>
	);
};

const NetAdminHOC = () => {
	const { uhttpdService } = useAppContext();
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);

	function submitSharedPassword(password) {
		setSubmitting(true);
		return uhttpdService
			.call('lime-utils-admin', 'set_root_password', { password })
			.toPromise()
			.then(result => new Promise((res, rej) => {
				result.status === 'ok' ? res() : rej();
			}))
			.then(() => setSuccess(true))
			.finally(() => setSubmitting(false));
	}

	return (
		<NetAdmin submitting={submitting} success={success}
			submitSharedPassword={submitSharedPassword}
		/>
	);
};

export default NetAdminHOC;
