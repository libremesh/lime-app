import { Trans } from "@lingui/macro";

import { RouterIcon } from "components/icons/teenny/router";

export const ChangeNodeMenu = () => (
    <span>
        <RouterIcon />
        <a href={"#/changenode"}>
            <Trans>Visit a neighboring node</Trans>
        </a>
    </span>
);
