import { action } from "@storybook/addon-actions";

import { Banner } from "components/banner";

const actions = {
    onOk: action("onOk"),
    onCancel: action("onCancel"),
    onNotShowAgain: action("notShowAgain"),
};

export default {
    title: "Banner",
    component: Banner,
};

export const LikeFBW = (args) => <Banner {...actions} {...args} />;
LikeFBW.args = {
    title: "Please configure your network",
    description: `Your router has not yet been configured,
	you can use our wizard to incorporate it into an existing network or create a new one.
	If you ignore this message it will continue to work with the default configuration.`,
};
