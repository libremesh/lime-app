import {h} from 'preact';
import I18n from 'i18n-js';
import FirmwarePage from './src/firmwarePage';
import { UpgradeAvailabeInfo } from './src/upgradeAvailable';

export default {
	name: 'Firmware',
	page: FirmwarePage,
	menu: () => <a href={'#/firmware'}>{I18n.t('Firmware')}</a>,
	isCommunityProtected: true,
	additionalRoutes: [
		['releaseInfo', UpgradeAvailabeInfo]
	]
}

export { SafeUpgradeCountdown } from './src/upgradeCountdown';
export { UpgradeAvailableBanner } from './src/upgradeAvailable';
