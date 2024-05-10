import { fromNavigator } from "@lingui/detect-locale";
import { I18nProvider } from "@lingui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "preact-router";
import { useEffect } from "preact/hooks";
import { Provider } from "react-redux";

import { UseModalProvider } from "components/Modal/Modal";
import { ToastProvider } from "components/toast/toastProvider";

import { Menu } from "containers/Menu";
import { RebootPage } from "containers/RebootPage";
import SubHeader from "containers/SubHeader";

import { AppContextProvider } from "utils/app.context";
import { useBoardData, useLogin, useSession } from "utils/queries";
import queryCache from "utils/queryCache";
import { CommunityProtectedRoute, Redirect, Route } from "utils/routes";

import { plugins } from "../config";
import i18n, { dynamicActivate } from "../i18n";
import { store } from "../store";
import { history } from "../store/history";
import { Header } from "./header";

const Routes = () => (
    // @ts-ignore
    <Router history={history}>
        {/* Public pages, don't need to be authenticated */}
        {plugins
            .filter((plugin) => !plugin.isCommunityProtected)
            .map((Component, i) => (
                <Route key={i} path={Component.name.toLowerCase()}>
                    <Component.page />
                </Route>
            ))}
        {/* Protected pages, need to be authenticated */}
        {plugins
            .filter((plugin) => plugin.isCommunityProtected)
            .map((Component, i) => (
                <CommunityProtectedRoute
                    key={i}
                    path={Component.name.toLowerCase()}
                >
                    <Component.page />
                </CommunityProtectedRoute>
            ))}
        {/* Additional plugins routes */}
        {plugins
            .filter((plugin) => plugin.additionalRoutes)
            .map((plugin) => plugin.additionalRoutes)
            .flat()
            .map(([path, Component], index) => (
                <Route path={path} key={index}>
                    <Component />
                </Route>
            ))}
        {/* Additional plugins protected routes */}
        {plugins
            .filter((plugin) => plugin.additionalProtectedRoutes)
            .map((plugin) => plugin.additionalProtectedRoutes)
            .flat()
            .map(([path, Component], index) => (
                <CommunityProtectedRoute path={path} key={index}>
                    <Component />
                </CommunityProtectedRoute>
            ))}
        <CommunityProtectedRoute path={"/reboot"}>
            <RebootPage />
        </CommunityProtectedRoute>
        {/* @ts-ignore */}
        <Redirect default path={"/"} to={"rx"} />
    </Router>
);

const App = () => {
    const { data: session } = useSession();
    const { mutate: login } = useLogin();
    const { data: boardData } = useBoardData({
        enabled: session?.username != null,
    });

    useEffect(() => {
        if (session?.username === null) {
            login({ username: "lime-app", password: "generic" });
        }
    }, [session, login]);

    if (!session?.username || !boardData) {
        return <div>Loading...</div>;
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
        dynamicActivate(fromNavigator().split("-")[0] as Locales);
    }, []);
    return (
        <I18nProvider i18n={i18n}>
            <QueryClientProvider client={queryCache}>
                <AppContextProvider>
                    <Provider store={store}>
                        <UseModalProvider>
                            <ToastProvider>
                                <App />
                            </ToastProvider>
                        </UseModalProvider>
                    </Provider>
                </AppContextProvider>
            </QueryClientProvider>
        </I18nProvider>
    );
};

export default AppDefault;
