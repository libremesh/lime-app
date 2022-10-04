import { Config as _Config } from "./config";

export default {
    title: "Containers/Node Configuration",
};

export const Config = (args) => (
    <_Config {...args} />
);
Config.args = {
    title: "Title",
    value: "value",
}
