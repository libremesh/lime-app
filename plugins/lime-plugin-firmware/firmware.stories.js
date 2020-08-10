import { UpgradeConfirm, UpgradeForm, UpgradeSuccess, UpgradeProgress, UpgradeReverted } from './src/firmwarePage';
import { SafeUpgradeCountdown } from './src/upgradeCountdown';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';

const formActions = {
	onUpgrade: action('onUpgrade'),
	tooglePreserveConfig: action('tooglePreserveConfig')
};


export default {
	title: 'Containers|Firmware Upgrade',
	decorators: [withKnobs]
};

export const SafeUpgradeIsAvailable = () => (
	<UpgradeForm upgradeConfirmAvailable={true} {...formActions} />
);

export const SafeUpgradeIsNotAvailable = () => (
	<UpgradeForm upgradeConfirmAvailable={false} {...formActions} />
);

export const AnInvalidFirmwareWasUploaded = () => (
	<UpgradeForm upgradeConfirmAvailable={false} firmwareIsValid={false} {...formActions} />
);

export const SuccessfullUpgradePreservingConfig = () => (
	<UpgradeSuccess preserveConfig={true} />
);

export const SuccessfullUpgradeNotPreservingConfig = () => (
	<UpgradeSuccess preserveConfig={false} />
);

export const upgradeProgress = () => (
	<UpgradeProgress elapsedTime={number('elapsedTime', 60)} totalTime={number('totalTime', 180)} />
)

export const safeUpgradeCountdown = () => (
	<SafeUpgradeCountdown counter={600} />
)

const confirmActions = {
	onConfirm: action('onConfirm'),
	onRevert: action('onRevert')
}

export const upgradeConfirm = () => (
	<UpgradeConfirm {...confirmActions} />
)

export const upgradeReverted = () => (
	<UpgradeReverted />
)
