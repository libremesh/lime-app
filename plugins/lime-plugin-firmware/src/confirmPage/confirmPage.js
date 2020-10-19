import { h } from 'preact';
import { route } from 'preact-router';
import I18n from 'i18n-js';

import { useUpgradeConfirm, useUpgradeRevert } from '../firmwareQueries';
import Loading from 'components/loading';

export const ConfirmChoices = ({onConfirm, onRevert, submitting}) => (
	<div class={`container container-padded container-center`}>
		<button onClick={onConfirm}>{I18n.t('Confirm')}</button>
		<p>{I18n.t('to keep the current configuration. Or ...')}</p>
		<button onClick={onRevert}>{I18n.t('Revert')}</button>
		<p>{I18n.t('to the previous configuration')}</p>
		{submitting &&
			<div>
				<Loading />
			</div>
		}
	</div>
);

export const Reverted = () => (
	<div class={`container container-padded container-center`}>
		<h3>{I18n.t('Reverting to previous version')}</h3>
		<span>{I18n.t('Please wait while the device reboots, and reload the app')}</span>
	</div>
);

export const ConfirmPage = ({hasReverted, onReverted}) => {
	const [upgradeConfirm, {isLoading: isConfirming}] = useUpgradeConfirm();
	const [upgradeRevert, {isLoading: isReverting}] = useUpgradeRevert();

	function onConfirm() {
		upgradeConfirm().then(() => {
			route('/');
		})
	}

	function onRevert() {
		upgradeRevert().then(() => {
			onReverted();
		})
	}

	if (hasReverted) {
		return <Reverted />
	}

	return <ConfirmChoices onConfirm={onConfirm} onRevert={onRevert} submitting={isConfirming || isReverting} />
}
