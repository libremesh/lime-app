import { VNode } from "preact";

import { Button } from "components/buttons/button";
import { IStatusMessage, StatusMessage } from "components/status/statusMessage";

export type IStatusAndButton = {
    btn?: VNode | string;
    onClick?: () => void;
} & IStatusMessage;

export const StatusAndButton = ({
    status,
    children,
    btn,
    onClick,
}: IStatusAndButton) => {
    const containerClasses =
        "flex flex-col items-center justify-center text-center bg-white py-5 gap-3";

    return (
        <div className={containerClasses}>
            <StatusMessage status={status}>{children}</StatusMessage>
            {btn && <Button onClick={onClick}>{btn}</Button>}
        </div>
    );
};
