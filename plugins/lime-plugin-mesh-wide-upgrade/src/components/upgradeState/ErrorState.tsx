import { Trans } from "@lingui/macro";
import { VNode } from "preact";

export const ErrorState = ({ msg }: { msg: string | VNode }) => {
    return (
        <div className="text-center ">
            <div className="w-32 h-32 text-9xl rounded-full border-2 border-danger text-danger flex items-center justify-center mx-auto">
                !
            </div>
            <div className="text-4xl">
                <Trans>Error!</Trans>
            </div>
            <div className="text-2xl">{msg}</div>
        </div>
    );
};
