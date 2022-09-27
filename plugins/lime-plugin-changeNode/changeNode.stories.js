import { action } from "@storybook/addon-actions";
import { array } from "@storybook/addon-knobs";
import { h } from "preact";

import { ChangeNode } from "./src/changeNodePage";

const actions = {
    loadStations: action("loadStations"),
};

export default {
    title: "Containers/ChangeNode",
    component: ChangeNode,
};

export const changeNodeScreen = () => (
    <ChangeNode
        stations={array("Mesh hosts", [
            "ql-anaymarcos",
            "ql-graciela",
            "ql-czuk-bbone",
        ])}
        {...actions}
    />
);
