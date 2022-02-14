import { h } from 'preact';
import { useState } from 'preact/hooks';

import '../style';

import { Trans, t } from '@lingui/macro';
import { isValidHostname, slugify } from 'utils/isValidHostname';
import { isValidPassword, ValidationMessages } from '../../../../src/containers/SharedPasswordForm';
import { useCreateNetwork } from '../FbwQueries';

export const NetworkForm = ({toggleForm}) => {

	const [createNetwork, { isLoading: isSubmitting}] = useCreateNetwork({
		onSuccess: () => {
			toggleForm('setting')();
		},
		onError: () => {
			toggleForm('create')();
		}
	});

	const [state, setState] = useState({
		communityName: '',
		hostName: '',
		password: '',
		passwordConfirmation: ''
	});

	function _changeName(e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value, end, true);
		setState({ ...state, communityName: e.target.value || '' });
		return e;
	}

	function _changeHostName(e) {
		const end = e.type === 'change';
		e.target.value = slugify(e.target.value.toLocaleLowerCase(), end);
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
			adminPassword: state.password
		});
	}

	function _isValidForm() {
		return (
			isValidPassword(state.password) &&
			state.password === state.passwordConfirmation &&
			isValidHostname(state.communityName, true) &&
			isValidHostname(state.hostName, true)
		);
	}

	return (<div class="container container-padded">
		<h4><span><Trans>Configure your new community network</Trans></span></h4>
		<label><Trans>Choose a name for your network</Trans></label>
		<input type="text" placeholder={t`Community name`} class="u-full-width" onInput={_changeName} />
		<label><Trans>Choose a shared password for network administration</Trans></label>
		<input type="password" placeholder={t`Password`} class="u-full-width" value={state.password} onInput={_changePassword} />
		<ValidationMessages password={state.password} />
		<label><Trans>Re-enter the shared password</Trans></label>
		<input type="password" placeholder={t`Re-enter Password`} class="u-full-width" value={state.passwordConfirmation} onInput={_changePasswordConfirmation} />
		{state.passwordConfirmation && state.password !== state.passwordConfirmation &&
			<p><Trans>The passwords do not match!</Trans></p>
		}
		<label><Trans>Choose a name for this node</Trans></label>
		<input type="text" placeholder={t`Host name`} class="u-full-width" value={state.hostName} onInput={_changeHostName} />
		<div class="row">
			<div class="six columns">
				<button
					class="u-full-width"
					disabled={!_isValidForm() || isSubmitting}
					onClick={_createNetwork}
				>
					<Trans>Create network</Trans>
				</button>
			</div>
			<div class="six columns">
				<button
					class="u-full-width"
					onClick={toggleForm(null)}
				>
					<Trans>Cancel</Trans>
				</button>
			</div>
		</div>
	</div>);
};