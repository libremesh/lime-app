/* eslint-disable react/jsx-no-bind */
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/preact";
import { h } from "preact";

import { SelectAction } from "./src/containers/SelectAction";

storiesOf("Containers/First boot wizard", module).add(
    "Choose an option",
    () => (
        <SelectAction toggleForm={(data) => () => action("toggleForm")(data)} />
    )
);
