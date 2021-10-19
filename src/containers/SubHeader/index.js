import { h } from "preact";
import { RebootBanner } from '../RebootBanner';
import { SafeUpgradeCountdown, UpgradeAvailableBanner } from '../../../plugins/lime-plugin-firmware';
import { useSession, useNeedReboot } from 'utils/queries';
import { useUpgradeInfo, useNewVersion } from '../../../plugins/lime-plugin-firmware/src/firmwareQueries';

const SubHeader = () => {
	const { data: session } = useSession();
	const { data: upgradeInfo } = useUpgradeInfo({enabled: session.username});
	const { data: newVersion } = useNewVersion({enabled: session.username});
	const { data: changesNeedReboot } = useNeedReboot();
	const showSuCountdown = upgradeInfo && upgradeInfo.suCounter > 0;
	const showNewFirmwareVersion = !showSuCountdown && newVersion && newVersion.version;
	return (
		<div>
			{showSuCountdown && <SafeUpgradeCountdown counter={upgradeInfo.suCounter} />}
			{showNewFirmwareVersion && <UpgradeAvailableBanner />}
			{changesNeedReboot && <RebootBanner />}
		</div>
	)
}

export default SubHeader;
