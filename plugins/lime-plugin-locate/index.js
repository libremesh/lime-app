import * as constants from "./src/locateConstants";
import epics from "./src/locateEpics";
import { LocateMenu } from "./src/locateMenu";
import Locate from "./src/locatePage";
import { reducer } from "./src/locateReducer";
import * as selector from "./src/locateSelectors";

export default {
    name: "Locate",
    page: Locate,
    menu: LocateMenu,
    store: {
        name: "locate",
        epics,
        reducer,
        selector,
        constants,
    },
};
