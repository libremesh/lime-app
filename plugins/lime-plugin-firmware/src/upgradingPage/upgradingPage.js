import { h } from 'preact';

import I18n from 'i18n-js';
import { useState, useEffect } from 'preact/hooks';
import ProgressBar from 'components/progressbar';

export const UpgradeSuccess = ({ onReload, upgradeConfirmAvailable} ) => (
	<div class="container container-padded container-center">
		<h3>
			{I18n.t('The upgrade should be done')}
		</h3>
		<button onClick={onReload}>{I18n.t('Try reloading the app')}</button>
		{ upgradeConfirmAvailable &&
			<span>
				<b>{I18n.t('When reloading the app you will be asked to confirm the upgrade, otherwise it will be reverted')}</b>
			</span>
		}
	</div>
)
export const UpgradeProgress = ({elapsedTime, totalTime}) => {
	const remainingTime = totalTime - elapsedTime;
	const progress = elapsedTime / totalTime * 100;
	return (
		<div class="container container-padded container-center">
			<h3>
				{I18n.t('The firmware is being upgraded...')}
			</h3>
			<ProgressBar progress={progress} />
			<span>{I18n.t('Please wait patiently for %{seconds} seconds and do not disconnect the device.', {seconds: remainingTime})}</span>
		</div>
	)
};

export const UpgradingPage = ({ upgradeConfirmAvailable }) => {
	const totalTime = 180;
	const [elapsedTime, setElapsedTime] = useState(0);

	useEffect(() => {
		const id = setInterval(() => setElapsedTime(elapsedTime => elapsedTime + 1), 1000)
		return () => {
			clearInterval(id);
		}
	}, [elapsedTime, setElapsedTime])


	function onReload() {
		window.location = window.origin;
	}

	if (elapsedTime < totalTime) {
		return <UpgradeProgress elapsedTime={elapsedTime} totalTime={totalTime} />
	}

	return <UpgradeSuccess {...{onReload, upgradeConfirmAvailable}} />
}
