import { useToggle } from "react-use";

import style from "./style.less";

export const Collapsible = ({ title, children, initCollapsed }) => {
    const [collapsed, toggleCollapsed] = useToggle(initCollapsed);
    return (
        <div
            className={`${style.collapsible} d-flex
            flex-column cursor-pointer`}
            onClick={toggleCollapsed}
        >
            <div className="d-flex">
                <div className="flex-grow-1">{title}</div>
                <div>{collapsed ? "ᐯ" : "ᐱ"}</div>
            </div>
            {!collapsed && <div className="flex-grow-1 mt-1">{children}</div>}
        </div>
    );
};
