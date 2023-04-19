import { Trans } from "@lingui/macro";

import { UpIcon } from "components/icons/teenny/up";

export const Menu = () => (
    <span>
        <UpIcon />
        <a href={"#/firmware"}>
            <Trans>Firmware</Trans>
        </a>
    </span>
);
