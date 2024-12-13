import { MeshUpgradeMenu } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeMenu";
import MeshUpgradePage from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradePage";

export default {
    name: "meshwide/upgrade",
    page: MeshUpgradePage,
    menu: MeshUpgradeMenu,
    isCommunityProtected: true,
    menuGroup: "meshwide",
} as LimePlugin;
