import * as constants from "./src/notesConstants";
import epics from "./src/notesEpics";
import { Menu } from "./src/notesMenu";
import Page from "./src/notesPage";
import { reducer } from "./src/notesReducer";

export default {
    name: "Notes",
    page: Page,
    menu: Menu,
    store: {
        name: "notes",
        epics,
        reducer,
        constants,
    },
} as LimePlugin;
