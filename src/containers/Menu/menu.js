import { plugins } from "../../config";
import style from "./style.less";

export const Menu = ({ opened, toggle }) => {
    // Group plugins by menuGroup
    const groupedPlugins = plugins
        .filter((plugin) => plugin.page && plugin.menu) // Only include plugins with both `page` and `menu`
        .reduce((groups, plugin) => {
            const group = plugin.menuGroup || "default"; // Use "default" for plugins without a menuGroup
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(plugin.menu);
            return groups;
        }, {});

    return (
        <div
            className={`${style.menu} ${
                opened ? style.menuOpened : style.menuClosed
            } d-flex flex-column`}
        >
            <nav className={style.menuItemsWrapper} onClick={toggle}>
                {Object.entries(groupedPlugins).map(([group, components]) => (
                    <div key={group} className={style.menuGroup}>
                        {group !== "default" && <hr />}
                        {components.map((Component, index) => (
                            <Component key={index} />
                        ))}
                    </div>
                ))}
            </nav>
        </div>
    );
};
