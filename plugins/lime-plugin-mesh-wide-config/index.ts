import MeshConfigPage from "./src/meshConfigPage";

export default {
    name: "meshwide/config",
    page: MeshConfigPage,
    isCommunityProtected: true,
    additionalRoutes: [["/meshwide/config", MeshConfigPage]],
} as LimePlugin;
