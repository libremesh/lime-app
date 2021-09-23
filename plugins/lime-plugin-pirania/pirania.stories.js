import { SafeUpgradeCountdown } from './src/upgradeCountdown';
import { action } from '@storybook/addon-actions';
import { UpgradeAvailabeInfo } from './src/upgradeAvailable';
import { UpgradingPage } from './src/upgradingPage/upgradingPage';
import { ConfirmChoices, Reverted } from './src/voucherTablePage/voucherTablePage';

import { UpgradePage } from './src/upgradePage/upgradePage';

const newVersionAvailable = {
	version: 'LibreRouterOS 1.5',
	'release-info-url': 'https://foro.librerouter.org/t/lanzamiento-de-librerouteros-1-5'
}

export default {
	title: 'Containers/Firmware Upgrade'
};

export const safeUpgradeAvailabe = () => <UpgradePage />;

safeUpgradeAvailabe.args = {
	queries: [
		[['eupgrade', 'is_new_version_available'], {}],
		[['lime-utils', 'get_upgrade_info'], {
			is_upgrade_confirm_supported: true
		}]
	]
}

export const safeUpgradeNotAvailable = () => <UpgradePage />;
safeUpgradeNotAvailable.args = {
	queries: [
		[['eupgrade', 'is_new_version_available'], {}],
		[['lime-utils', 'get_upgrade_info'], {
			is_upgrade_confirm_supported: false
		}]
	]
}

export const upgrading = () => (
	<UpgradingPage />
);

export const safeUpgradeCountdown = () => (
	<SafeUpgradeCountdown counter={600} />
)

const confirmActions = {
	onConfirm: action('onConfirm'),
	onRevert: action('onRevert')
}

export const upgradeConfirm = () => (
	<ConfirmChoices {...confirmActions} />
)
upgradeConfirm.args = {
	queries: [
		[['lime-utils', 'get_upgrade_info'], {
			suCounter: 300
		}]
	]
}

export const upgradeReverted = () => (
	<Reverted />
)


export const newVersionAvailableMoreInfo = () => <UpgradeAvailabeInfo />
newVersionAvailableMoreInfo.args = {
	forceSubheaderHidden: true,
	queries: [
		[['eupgrade', 'is_new_version_available'], newVersionAvailable]
	]
}

export const upgradePageWithReleaseAvailable = () => <UpgradePage />
upgradePageWithReleaseAvailable.args = {
	forceSubheaderHidden: true,
	queries: [
		[['eupgrade', 'is_new_version_available'], newVersionAvailable],
		[['lime-utils', 'get_upgrade_info'], {
			is_upgrade_confirm_supported: true
		}],
		[['eupgrade', 'download_status'], {download_status: 'not-initiated'}]
	]
}

export const upgradePageWithReleaseDownloading = () => <UpgradePage />
upgradePageWithReleaseDownloading.args = {
	forceSubheaderHidden: true,
	queries: [
		[['eupgrade', 'is_new_version_available'], newVersionAvailable],
		[['lime-utils', 'get_upgrade_info'], {
			is_upgrade_confirm_supported: true
		}],
		[['eupgrade', 'download_status'], {download_status: 'downloading'}]
	]
}

export const upgradePageWithReleaseDownloaded = () => <UpgradePage />
upgradePageWithReleaseDownloaded.args = {
	forceSubheaderHidden: true,
	queries: [
		[['eupgrade', 'is_new_version_available'], newVersionAvailable],
		[['lime-utils', 'get_upgrade_info'], {
			is_upgrade_confirm_supported: true
		}],
		[['eupgrade', 'download_status'], {download_status: 'downloaded'}]
	]
}
