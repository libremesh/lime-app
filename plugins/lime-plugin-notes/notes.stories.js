/* eslint-disable react/jsx-no-bind */
import { action } from "@storybook/addon-actions";
import { boolean, text } from "@storybook/addon-knobs";
import { h } from "preact";

import { Page } from "./src/notesPage";

const actions = {
    getNotes: action("getNotes"),
    setNotes: action("setNotes"),
};

export default {
    title: "Containers/Notes",
    component: Page,
};

export const manageNote = () => (
    <Page
        notes={text("Note", "This node works great")}
        loading={boolean("Loading", false)}
        {...actions}
    />
);
