import { Trans } from "@lingui/macro";

import { MapIcon } from "components/icons/teenny/map";

export const MeshWideMenu = () => (
    <span>
        <MapIcon />
        <a href={"#/meshwide"}>
            <Trans>Mesh Map</Trans>
        </a>
    </span>
);
