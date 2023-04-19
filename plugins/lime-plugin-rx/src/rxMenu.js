import { Trans } from "@lingui/macro";

import { StatusIcon } from "components/icons/teenny/status";

export const RxMenu = () => (
    <span>
        <StatusIcon />
        <a href={"#/rx"}>
            <Trans>Status</Trans>
        </a>
    </span>
);
