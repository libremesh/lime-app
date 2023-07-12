import { ComponentChildren } from "preact";

import { NotificationRocket } from "components/icons/notification/rocket";
import { NotificationWarning } from "components/icons/notification/warning";

type NotificationType = "warning" | "update";

const Notification = ({
    title,
    children,
    right,
    onClick,
    type = "update",
}: {
    title: string;
    children: ComponentChildren;
    right?: string | ComponentChildren;
    onClick?: () => void;
    type: NotificationType;
}) => {
    let icon;
    switch (type) {
        case "warning":
            icon = <NotificationWarning />;
            break;
        default:
            icon = <NotificationRocket />;
            break;
    }
    return (
        <div
            className={`flex w-full min-h-min bg-primary-card border-b-2 border-l-2 border-r-2 border-primary-dark pr-4 ${
                onClick && "cursor-pointer"
            }`}
            onClick={onClick}
        >
            <div className="flex items-center h-full mx-8 ">{icon}</div>
            <div className="flex flex-col w-full pt-4 pb-10 justify-start gap-4">
                <div className="flex justify-between items-center">
                    <div className="text-3xl font-semibold text-left">
                        {title}
                    </div>
                    {right && <div className="text-xl">{right}</div>}
                </div>
                <div className="mr-2 leading-tight">{children}</div>
            </div>
        </div>
    );
};

export default Notification;
