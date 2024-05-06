import { action } from "@storybook/addon-actions";

import Toast from "components/toast";

const actions = {
    hideToast: action("hide"),
};

export default {
    title: "Toast",
    component: Toast,
};

export const InfoToast = (args) => (
    <Toast onHide={actions.hideToast} {...args} />
);
InfoToast.args = {
    text: "Lorem ipsum dolor sit amet",
};

export const SuccessToast = (args) => (
    <Toast onHide={actions.hideToast} type="success" {...args} />
);
SuccessToast.args = {
    text: "Success Lorem ipsum dolor sit amet",
};

export const ErrorToast = (args) => (
    <Toast onHide={actions.hideToast} type="error" {...args} />
);
ErrorToast.args = {
    text: "Error Lorem ipsum dolor sit amet",
};
