import { VNode } from "preact";

import { Button } from "components/buttons/button";
import { BinIcon } from "components/icons/bin";
import { EditIcon } from "components/icons/edit";
import { StatusIcon } from "components/icons/status";

interface IStatusMessage {
    isError: boolean;
    children: VNode | string;
}

// todo(kon): merge with src/components/status/statusAndButton.tsx
export const StatusAndButton = ({
    isError,
    children,
    btn,
    onClick,
}: { btn?: VNode | string; onClick?: () => void } & IStatusMessage) => {
    const containerClasses =
        "flex flex-col items-center justify-center text-center bg-white py-5 gap-3";

    return (
        <div className={containerClasses}>
            <StatusMessage isError={isError}>{children}</StatusMessage>
            {btn && <Button onClick={onClick}>{btn}</Button>}
        </div>
    );
};

export const StatusMessage = ({
    isError,
    children,
    classes,
}: {
    classes?: string;
} & IStatusMessage) => (
    <div
        className={`flex flex-row gap-3 ${classes} items-center justify-center text-center`}
    >
        {isError ? (
            <StatusIcon status={"warning"} />
        ) : (
            <StatusIcon status={"success"} />
        )}
        {children}
    </div>
);
