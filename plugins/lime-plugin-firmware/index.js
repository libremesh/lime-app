import {h} from 'preact';
import { Trans } from '@lingui/macro';
import FirmwarePage from './src/firmwarePage';
import { UpgradeAvailabeInfo } from './src/upgradeAvailable';

export default {
	name: 'Firmware',
	page: FirmwarePage,
	menu: () => <a href={'#/firmware'}><Trans>Firmware</Trans></a>,
	isCommunityProtected: true,
	additionalRoutes: [
		['releaseInfo', UpgradeAvailabeInfo]
	]
}

export { SafeUpgradeCountdown } from './src/upgradeCountdown';
export { UpgradeAvailableBanner } from './src/upgradeAvailable';
