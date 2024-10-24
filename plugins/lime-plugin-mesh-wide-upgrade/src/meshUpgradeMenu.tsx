import { Trans } from "@lingui/macro";

import { GlobeAmericasIcon } from "components/icons/teenny/globe";

export const MeshUpgradeMenu = () => (
    <span>
        <GlobeAmericasIcon />
        <a href={"#/meshwideupgrade"}>
            <Trans>Mesh Wide Upgrade</Trans>
        </a>
    </span>
);
