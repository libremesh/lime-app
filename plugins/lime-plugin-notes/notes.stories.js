import { action } from "@storybook/addon-actions";

import { Page } from "./src/notesPage";

const actions = {
    getNotes: action("getNotes"),
    setNotes: action("setNotes"),
};

export default {
    title: "Containers/Notes",
    component: Page,
};

export const manageNote = (args) => <Page {...actions} {...args} />;
manageNote.args = {
    notes: "This node works great",
    loading: false,
};
