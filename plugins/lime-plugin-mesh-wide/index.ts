import { MeshWideMenu } from "./src/meshWideMenu";
import MeshWidePage from "./src/meshWidePage";
import MeshWideConfigPage from "./src/screens/configPage";

export default {
    name: "MeshWide",
    page: MeshWidePage,
    menu: MeshWideMenu,
    additionalRoutes: [["/meshwide/config", MeshWideConfigPage]],
} as LimePlugin;
