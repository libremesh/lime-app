import { NetAdminMenu } from "./src/netAdminMenu";
import NetAdmin from "./src/netAdminPage";

export default {
    name: "NetAdmin",
    page: NetAdmin,
    menu: NetAdminMenu,
    isCommunityProtected: true,
} as LimePlugin;
