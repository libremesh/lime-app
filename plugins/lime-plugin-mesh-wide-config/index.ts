import { MeshConfigMenu } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigMenu";

import MeshConfigPage from "./src/meshConfigPage";

export default {
    name: "meshwide/config",
    page: MeshConfigPage,
    menu: MeshConfigMenu,
    isCommunityProtected: true,
    menuGroup: "meshwide",
} as LimePlugin;
