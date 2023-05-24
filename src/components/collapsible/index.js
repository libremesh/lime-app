import { useToggle } from "react-use";

import { ChevronDown, ChevronUp } from "components/icons/teenny/chevrons";

export const Collapsible = ({ title, children, initCollapsed }) => {
    const [collapsed, toggleCollapsed] = useToggle(initCollapsed);

    return (
        <div className={`flex bg-gray-200 rounded-md flex-col`}>
            <div
                className="flex flex-row  items-center justify-between px-6 py-5 cursor-pointer"
                onClick={toggleCollapsed}
            >
                <div className="font-semibold">{title}</div>
                <div className={""}>
                    {collapsed ? <ChevronDown /> : <ChevronUp />}
                </div>
            </div>
            {!collapsed && <div>{children}</div>}
        </div>
    );
};
