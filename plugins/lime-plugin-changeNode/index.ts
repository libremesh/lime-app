import * as constants from "./src/changeNodeConstants";
import epics from "./src/changeNodeEpics";
import { ChangeNodeMenu } from "./src/changeNodeMenu";
import ChangeNode from "./src/changeNodePage";
import { reducer } from "./src/changeNodeReducer";
import * as selector from "./src/changeNodeSelectors";

export default {
    name: "changeNode",
    page: ChangeNode,
    menu: ChangeNodeMenu,
    store: {
        name: "changeNode",
        epics,
        reducer,
        selector,
        constants,
    },
} as LimePlugin;
