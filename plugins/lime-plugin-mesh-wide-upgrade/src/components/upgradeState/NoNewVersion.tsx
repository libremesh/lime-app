import { Trans } from "@lingui/macro";

import {
    MeshUpgradeSuccessIcon,
    UpgradeState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";

export const NoNewVersionAvailable = () => {
    return (
        <UpgradeState
            title={<Trans>No new version available!</Trans>}
            icon={<MeshUpgradeSuccessIcon />}
        />
    );
};
