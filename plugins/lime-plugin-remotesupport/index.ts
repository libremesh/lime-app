import ConsoleView from "./src/consoleView";
import Menu from "./src/remoteSupportMenu";
import RemoteSupportPage from "./src/remoteSupportPage";

export default {
    name: "remotesupport",
    page: RemoteSupportPage,
    menu: Menu,
    isCommunityProtected: true,
    additionalProtectedRoutes: [["console", ConsoleView]],
} as LimePlugin;
