import { Trans } from "@lingui/macro";

import { PinIcon } from "components/icons/teenny/pin";

export const LocateMenu = () => (
    <span>
        <PinIcon />
        <a href={"#/locate"}>
            <Trans>Locate</Trans>
        </a>
    </span>
);
