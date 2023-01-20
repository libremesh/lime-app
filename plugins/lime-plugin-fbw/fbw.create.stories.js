import { action } from "@storybook/addon-actions";

import { NetworkForm } from './src/containers/NetworkForm';

export default {
    title: "Containers/First boot wizard",
}

export const CreateANewNetwork = () => (
    <NetworkForm
        createNetwork={action("createNetwork")}
        toggleForm={(data) => () => action("toggleForm")(data)}
    />
)
