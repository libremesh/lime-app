import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";

import { plugins } from "../../config";
import style from "./style.less";

export const Menu = ({ opened, toggle }) => {
    const [currentView, setCurrentView] = useState("node");
    const hasCommunityPlugins = () =>
        plugins.filter((p) => p.menuView && p.menuView === "community").length >
        0;
    function changeCurrentView(e) {
        e.preventDefault();
        setCurrentView(currentView === "node" ? "community" : "node");
    }

    return (
        <div
            className={`${style.menu} ${
                opened ? style.menuOpened : style.menuClosed
            } d-flex flex-column`}
        >
            <nav className={style.menuItemsWrapper} onClick={toggle}>
                {plugins
                    .map((plugin) => ({
                        ...plugin,
                        menuView: plugin.menuView || "node",
                    }))
                    .filter(
                        (plugin) =>
                            plugin.page &&
                            plugin.menu &&
                            plugin.menuView === currentView
                    )
                    .map((plugin) => plugin.menu)
                    .map((Component, index) => (
                        <Component key={index} />
                    ))}
            </nav>
            {hasCommunityPlugins() && (
                <nav className={style.viewSwitchWrapper}>
                    <a
                        href="#0"
                        className={style.viewSwitch}
                        onClick={changeCurrentView}
                    >
                        {currentView === "node" && (
                            <Trans>Go to Community View</Trans>
                        )}
                        {currentView === "community" && (
                            <Trans>Go to Node View</Trans>
                        )}
                    </a>
                </nav>
            )}
        </div>
    );
};
