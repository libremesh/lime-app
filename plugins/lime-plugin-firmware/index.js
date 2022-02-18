import FirmwarePage from './src/firmwarePage';
import { Menu } from './src/firmwareMenu';
import { UpgradeAvailabeInfo } from './src/upgradeAvailable';

export default {
	name: 'Firmware',
	page: FirmwarePage,
	menu: Menu,
	isCommunityProtected: true,
	additionalRoutes: [
		['releaseInfo', UpgradeAvailabeInfo]
	]
}

export { SafeUpgradeCountdown } from './src/upgradeCountdown';
export { UpgradeAvailableBanner } from './src/upgradeAvailable';
