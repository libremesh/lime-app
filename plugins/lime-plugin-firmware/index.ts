import { Menu } from "./src/firmwareMenu";
import FirmwarePage from "./src/firmwarePage";
import { UpgradeAvailabeInfo } from "./src/upgradeAvailable";

export default {
    name: "Firmware",
    page: FirmwarePage,
    menu: Menu,
    isCommunityProtected: true,
    additionalRoutes: [["releaseInfo", UpgradeAvailabeInfo]],
} as LimePlugin;

export { SafeUpgradeCountdown } from "./src/upgradeCountdown";
export { UpgradeAvailableBanner } from "./src/upgradeAvailable";
