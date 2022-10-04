import { action } from "@storybook/addon-actions";

import { ChangeNode } from "./src/changeNodePage";

const actions = {
    loadStations: action("loadStations"),
};

export default {
    title: "Containers/ChangeNode",
    component: ChangeNode,
};

export const changeNodeScreen = (args) => (
    <ChangeNode
        {...actions}
        {...args}
    />
);
changeNodeScreen.args = {
    stations: [
        "ql-anaymarcos",
        "ql-graciela",
        "ql-czuk-bbone",
    ],
}
