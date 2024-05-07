import { VNode } from "preact";

import { StatusIcon, StatusIcons } from "components/icons/status";

export interface IStatusMessage {
    status?: StatusIcons;
    children: VNode | string;
}
export const StatusMessage = ({
    status,
    children,
    classes,
}: {
    classes?: string;
} & IStatusMessage) => (
    <div
        className={`flex flex-row gap-3 ${classes} items-center justify-center text-center`}
    >
        {status && <StatusIcon status={status} />}
        {children}
    </div>
);
