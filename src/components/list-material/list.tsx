import { ComponentChildren } from "preact";
import { useToggle } from "react-use";

import Divider from "components/divider";
import { ChevronDown, ChevronRight } from "components/icons/teenny/chevrons";

interface IListItemProps {
    leftComponent?: ComponentChildren;
    rightComponent?: ComponentChildren;
    title: string;
    description?: string | ComponentChildren;
    rightText?: string | ComponentChildren;
    onClick?: (ev) => void;
}

export const ListItem = ({
    leftComponent,
    rightComponent,
    title,
    description,
    rightText,
    onClick,
}: IListItemProps) => {
    return (
        <div
            className={`flex flex-col ${onClick && "cursor-pointer"}`}
            onClick={onClick}
        >
            <div className="flex py-3 px-5 justify-between items-center space-x-3">
                {leftComponent && (
                    <div className="flex items-center h-full">
                        <div className="mr-4"> {leftComponent} </div>
                    </div>
                )}
                <div className="flex justify-start w-full">
                    <div className="flex flex-col flex-grow flex-shrink-0 flex-basis-0 w-full">
                        <div className="font-semibold">{title}</div>
                        {description && (
                            <p className="text-gray-600">{description}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-6 h-full">
                    {rightText && (
                        <p className="font-light text-gray-600 mr-2">
                            {rightText}
                        </p>
                    )}
                    {rightComponent && (
                        <div className="mr-4"> {rightComponent} </div>
                    )}
                </div>
            </div>
            <Divider width={"full"} />
        </div>
    );
};

export const ListItemCollapsible = ({
    initCollapsed = true,
    rightComponent,
    children,
    ...rest
}: {
    initCollapsed?: boolean;
    children: ComponentChildren;
} & IListItemProps) => {
    const [collapsed, toggleCollapsed] = useToggle(initCollapsed);
    const _rightComponent =
        rightComponent ?? collapsed ? <ChevronRight /> : <ChevronDown />;

    return (
        <>
            <ListItem
                {...rest}
                onClick={toggleCollapsed}
                rightComponent={_rightComponent}
            />
            {!collapsed && <div className="py-4 px-5">{children}</div>}
        </>
    );
};
