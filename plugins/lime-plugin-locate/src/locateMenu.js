import { Trans } from "@lingui/macro";

import { MapIcon } from "components/icons/teenny/map";

export const LocateMenu = () => (
    <span>
        <MapIcon />
        <a href={"#/locate"}>
            <Trans>Map</Trans>
        </a>
    </span>
);
