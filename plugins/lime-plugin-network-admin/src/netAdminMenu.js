import { Trans } from "@lingui/macro";

import { LockIcon } from "components/icons/teenny/lock";

export const NetAdminMenu = () => (
    <span>
        <LockIcon />
        <a href="#/netadmin">
            <Trans>Shared Password</Trans>
        </a>
    </span>
);
