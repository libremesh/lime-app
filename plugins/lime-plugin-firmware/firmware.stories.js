import { UpgradeConfirm, UpgradeForm, UpgradeSuccess, UpgradeReverted } from './src/firmwarePage';
import { SafeUpgradeCountdown } from './src/upgradeCountdown';
import { action } from '@storybook/addon-actions';

const formActions = {
	onUpgrade: action('onUpgrade'),
	tooglePreserveConfig: action('tooglePreserveConfig')
};


export default {
	title: 'Containers|Firmware Upgrade'
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
