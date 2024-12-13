import { VNode } from "preact";

import { Button, ButtonProps } from "components/buttons/button";
import { IStatusMessage, StatusMessage } from "components/status/statusMessage";

export type IStatusAndButton = {
    btn?: VNode | string;
    btnCancel?: VNode | string;
    onClick?: () => void;
    onClickCancel?: () => void;
    btnProps?: ButtonProps;
} & IStatusMessage;

export const StatusAndButton = ({
    status,
    children,
    btn,
    btnCancel,
    onClick,
    onClickCancel,
    btnProps,
}: IStatusAndButton) => {
    const containerClasses =
        "flex flex-col items-center justify-center text-center bg-white py-5 gap-3";

    return (
        <div className={containerClasses}>
            <StatusMessage status={status}>{children}</StatusMessage>
            <div className={"flex flex-row items-center justify-center gap-3"}>
                {btnCancel && (
                    <Button
                        color={"danger"}
                        onClick={onClickCancel}
                        {...btnProps}
                    >
                        {btnCancel}
                    </Button>
                )}
                {btn && (
                    <Button onClick={onClick} {...btnProps}>
                        {btn}
                    </Button>
                )}
            </div>
        </div>
    );
};
