import { action } from "@storybook/addon-actions";

import { NetAdmin } from "./src/netAdminPage";

const submitSharedPassword = action("setSharedPassword");

export default {
    title: "Containers/Network Configuration screen",
}

export const ChangeSharedPassword = (args) => (
    <NetAdmin
        submitSharedPassword={submitSharedPassword}
        {...args}
    />
)
ChangeSharedPassword.args = {
    submitting: false,
    success: false,
}
