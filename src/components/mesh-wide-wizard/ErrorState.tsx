import { Trans } from "@lingui/macro";
import { VNode } from "preact";

import {
    MeshUpgradeErrorIcon,
    UpgradeState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";

export const ErrorState = ({ msg }: { msg: string | VNode }) => {
    return (
        <UpgradeState
            title={<Trans>Error!</Trans>}
            icon={<MeshUpgradeErrorIcon />}
        >
            {msg}
        </UpgradeState>
    );
};
