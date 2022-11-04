import { i18n } from "@lingui/core";
// import i18n, { dynamicActivate } from '../i18n';
import { I18nProvider } from "@lingui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/preact";
import { messages } from "i18n/en/messages";
import { en } from "make-plural/plurals";

import queryCache from "utils/queryCache";

import SubHeader from "../containers/SubHeader";

i18n.load({
    en: messages,
});
i18n.loadLocaleData({
    en: { plurals: en },
});

const AllTheProviders = ({ children }) => {
    // dynamicActivate("en");
    i18n.activate("en");
    return (
        <I18nProvider i18n={i18n} language="en">
            <QueryClientProvider client={queryCache}>
                <SubHeader />
                {children}
            </QueryClientProvider>
        </I18nProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export const flushPromises = () =>
    // Flush all pending resolved promise handlers.
    // Usefull when testing some scenarios with async tasks.
    new Promise((resolve) => setImmediate(resolve));

// re-export everything
export * from "@testing-library/preact";

// override render method
export { customRender as render };
