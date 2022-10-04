import { fromNavigator } from "@lingui/detect-locale";
import { I18nProvider } from "@lingui/react";
import { addDecorator } from "@storybook/preact";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "components/header";

import { Menu } from "containers/Menu";
import SubHeader from "containers/SubHeader";

import { AppContext } from "utils/app.context";

import i18n, { dynamicActivate } from "~/i18n";
import "~/style";

dynamicActivate(fromNavigator().split("-")[0]);

const boarData = {
    hostname: "ql-anaymarcos",
    release: {
        description: "LibreRouterOs 1.4",
    },
    model: "LibreRouter v1",
};

const session = {
    username: "lime-app",
};

const upgradeInfo = {
    suCounter: -1,
};

const DEFAULT_QUERIES = [
    [["system", "board"], boarData],
    [["session", "get"], session],
    [["lime-utils", "get_upgrade_info"], upgradeInfo],
    [["eupgrade", "is_new_version_available"], {}],
];

function queryCacheFactory(queries = []) {
    const defaultQueries = Object.fromEntries(
        DEFAULT_QUERIES.map(([key, value]) => [JSON.stringify(key), value])
    );
    const customQueries = Object.fromEntries(
        queries.map(([key, value]) => [JSON.stringify(key), value])
    );
    const finalQueries = {
        ...defaultQueries,
        ...customQueries,
    };
    const queryCache = new QueryClient({
        defaultConfig: {
            queries: {
                initialStale: Infinity,
                staleTime: Infinity,
                refetchOnMount: false,
                retry: 0,
            },
        },
    });
    for (const [key, value] of Object.entries(finalQueries)) {
        queryCache.setQueryData(JSON.parse(key), value);
    }
    return queryCache;
}

const withQueryCache = (Story, context) => (
    <QueryClientProvider client={queryCacheFactory(context.args.queries)}>
        <Story />
    </QueryClientProvider>
);

const withI18n = (Story) => (
    <I18nProvider i18n={i18n}>
        <Story />
    </I18nProvider>
);

const withinAppContext = (Story, context) => {
    const appcontext = {
        menuEnabled: context.globals.menuEnabled === "yes",
    };
    return (
        <AppContext.Provider value={appcontext}>
            <div id="app">
                {context.globals.header === "yes" && <Header Menu={Menu} />}
                {!context.args.forceSubheaderHidden && <SubHeader />}
                <div id="content">
                    <Story />
                </div>
            </div>
        </AppContext.Provider>
    );
};

export const globalTypes = {
    header: {
        name: "header",
        description: "Show header in story",
        defaultValue: "yes",
        toolbar: {
            items: ["no", "yes"],
        },
    },
    menuEnabled: {
        name: "menu enabled",
        description: "The menu in the header is enabled",
        defaultValue: "yes",
        toolbar: {
            items: ["no", "yes"],
        },
    },
};

addDecorator(withinAppContext);
addDecorator(withQueryCache);
addDecorator(withI18n);
