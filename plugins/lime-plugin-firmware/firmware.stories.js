import { FirmwarePage } from './src/firmwarePage';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const actions = {
	onUpgrade: action('onUpgrade'),
	tooglePreserveConfig: action('tooglePreserveConfig')
};

export default {
	title: 'Containers|Firmware Upgrade',
	decorators: [withKnobs]
};

export const SafeUpgradeIsAvailable = () => (
	<FirmwarePage upgradeConfirmAvailable={true} {...actions} />
);

export const SafeUpgradeIsNotAvailable = () => (
	<FirmwarePage upgradeConfirmAvailable={false} {...actions} />
);

export const AnInvalidFirmwareWasUploaded = () => (
	<FirmwarePage upgradeConfirmAvailable={false} firmwareIsValid={false} {...actions} />
);

export const SuccessfullUpgradePreservingConfig = () => (
	<FirmwarePage upgradeConfirmAvailable={false} upgradeSuccess={true} preserveConfig={true} {...actions} />
);

export const SuccessfullUpgradeNotPreservingConfig = () => (
	<FirmwarePage upgradeConfirmAvailable={false} upgradeSuccess={true} preserveConfig={false} {...actions} />
);
