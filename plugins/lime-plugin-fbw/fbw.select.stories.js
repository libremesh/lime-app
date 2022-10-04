import { action } from "@storybook/addon-actions";

import { SelectAction } from './src/containers/SelectAction';

export default {
    title: "Containers/First boot wizard",
}

export const ChooseAnOption = () => (
    <SelectAction toggleForm={(data) => () => action("toggleForm")(data)} />
)

