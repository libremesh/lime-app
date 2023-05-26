import { VNode } from "preact";

import { Button } from "components/buttons/button";

interface IStatusMessage {
    isError: boolean;
    children: VNode | string;
}

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
            <span
                className={
                    "rounded-full border-2 border-danger text-danger w-8 h-8 flex items-center justify-center mx-2"
                }
            >
                !
            </span>
        ) : (
            <span className={"text-success text-4xl"}>✓</span>
        )}
        {children}
    </div>
);
