import { action } from "@storybook/addon-actions";

import { FbwBanner } from "./src/containers/FbwBanner";

export default {
    title: "Containers/First boot wizard",
};

export const ChooseAnOption = () => (
    <FbwBanner toggleForm={(data) => () => action("toggleForm")(data)} />
);
