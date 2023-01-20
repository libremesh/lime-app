

import { Trans } from '@lingui/macro';
import { useState, useEffect } from 'preact/hooks';
import ProgressBar from 'components/progressbar';

export const UpgradeSuccess = ({ onReload, upgradeConfirmAvailable} ) => (
	<div class="container container-padded container-center">
		<h3>
			<Trans>The upgrade should be done</Trans>
		</h3>
		<button onClick={onReload}><Trans>Try reloading the app</Trans></button>
		{ upgradeConfirmAvailable &&
			<span>
				<b><Trans>When reloading the app you will be asked to confirm the upgrade, otherwise it will be reverted</Trans></b>
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
				<Trans>The firmware is being upgraded...</Trans>
			</h3>
			<ProgressBar progress={progress} />
			<span><Trans>Please wait patiently for {remainingTime} seconds and do not disconnect the device.</Trans></span>
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
