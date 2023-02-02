import * as constants from "./src/rxConstants";
import epics from "./src/rxEpics";
import { RxMenu } from "./src/rxMenu";
import Rx from "./src/rxPage";
import { reducer } from "./src/rxReducer";
import * as selector from "./src/rxSelectors";

export default {
    name: "Rx",
    page: Rx,
    menu: RxMenu,
    store: {
        name: "rx",
        epics,
        reducer,
        selector,
        constants,
    },
};
