import * as constants from "./src/groundRoutingConstants";
import epics from "./src/groundRoutingEpics";
import { Menu } from "./src/groundRoutingMenu";
import Page from "./src/groundRoutingPage";
import { reducer } from "./src/groundRoutingReducer";

export default {
    name: "groundRouting",
    page: Page,
    menu: Menu,
    store: {
        name: "groundrouting",
        epics,
        reducer,
        constants,
    },
};
