import { Header } from "components/header";

import { Menu } from "containers/Menu";

import { AppContext } from "utils/app.context";

export default {
    title: "Header",
    component: Header,
};

export const WithMenuDisabled = (args) => (
    <AppContext.Provider value={args}>
        <Header Menu={Menu} />
    </AppContext.Provider>
);
WithMenuDisabled.args = {
    menuEnabled: false,
};

export const WithMenuEnabled = (args) => (
    <AppContext.Provider value={args}>
        <Header Menu={Menu} />
    </AppContext.Provider>
);
WithMenuEnabled.args = {
    menuEnabled: true,
};
