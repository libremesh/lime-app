import { Trans } from "@lingui/macro";

import { AdjustVertical } from "components/icons/teenny/adjust";

export const MeshConfigMenu = () => (
    <span>
        <AdjustVertical />
        <a href={"#/meshwide/config"}>
            <Trans>Mesh Wide Config</Trans>
        </a>
    </span>
);
