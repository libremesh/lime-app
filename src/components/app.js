import { fromNavigator } from "@lingui/detect-locale";
import { I18nProvider } from "@lingui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "preact-router";
import { useEffect } from "preact/hooks";
import { Provider } from "react-redux";

import { useBoardData, useLogin, useSession } from "utils/queries";
import queryCache from "utils/queryCache";

import { plugins } from "../config";
import { Menu } from "../containers/Menu";
import { RebootPage } from "../containers/RebootPage";
import SubHeader from "../containers/SubHeader";
import i18n, { dynamicActivate } from "../i18n";
import { store } from "../store";
import { history } from "../store/history";
import { AppContextProvider } from "../utils/app.context";
import { CommunityProtectedRoute, Redirect, Route } from "../utils/routes";
import { Header } from "./header";

const Routes = () => (
    <Router history={history}>
        {/* Public pages, don't need to be authenticated */}
        {plugins
            .filter((plugin) => !plugin.isCommunityProtected)
            .map((Component) => (
                <Route
                    path={Component.name.toLowerCase()}
                    key={Component.name.toLowerCase()}
                >
                    <Component.page />
                </Route>
            ))}
        {/* Protected pages, need to be authenticated */}
        {plugins
            .filter((plugin) => plugin.isCommunityProtected)
            .map((Component) => (
                <CommunityProtectedRoute
                    path={Component.name.toLowerCase()}
                    key={Component.name.toLowerCase()}
                >
                    <Component.page />
                </CommunityProtectedRoute>
            ))}
        {/* Additional plugins routes */}
        {plugins
            .filter((plugin) => plugin.additionalRoutes)
            .map((plugin) => plugin.additionalRoutes)
            .flat()
            .map(([path, Component]) => (
                <Route path={path} key={Component.name.toLowerCase()}>
                    <Component />
                </Route>
            ))}
        {/* Additional plugins protected routes */}
        {plugins
            .filter((plugin) => plugin.additionalProtectedRoutes)
            .map((plugin) => plugin.additionalProtectedRoutes)
            .flat()
            .map(([path, Component]) => (
                <CommunityProtectedRoute
                    path={path}
                    key={Component.name.toLowerCase()}
                >
                    <Component />
                </CommunityProtectedRoute>
            ))}
        <CommunityProtectedRoute path={"/reboot"}>
            <RebootPage />
        </CommunityProtectedRoute>
        <Redirect default path={"/"} to={"rx"} />
    </Router>
);

const App = () => {
    const { data: session } = useSession();
    const { mutate: login } = useLogin();
    const { data: boardData } = useBoardData({
        enabled: session && session.username !== undefined,
    });

    useEffect(() => {
        if (session?.username === null) {
            login({ username: "lime-app", password: "generic" });
        }
    }, [session, login]);

    if (!session?.username || !boardData) {
        return "Loading...";
    }

    return (
        <div id="app">
            <ReactQueryDevtools />
            <Header Menu={Menu} />
            <SubHeader />
            <div id="content">
                <Routes />
            </div>
        </div>
    );
};

const AppDefault = () => {
    useEffect(() => {
        dynamicActivate(fromNavigator().split("-")[0]);
    }, []);
    return (
        <I18nProvider i18n={i18n}>
            <QueryClientProvider client={queryCache}>
                <AppContextProvider>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </AppContextProvider>
            </QueryClientProvider>
        </I18nProvider>
    );
};

export default AppDefault;
