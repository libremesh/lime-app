import { Trans } from "@lingui/macro";

import {
    MeshUpgradeErrorIcon,
    MeshUpgradeSuccessIcon,
    ParallelErrors,
    UpgradeState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";
import { useParallelConfirmUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const Confirmed = () => {
    const { errors } = useParallelConfirmUpgrade();
    // let icon = <div className="text-9xl text-primary-light">✓</div>;
    let icon = <MeshUpgradeSuccessIcon />;
    let title = <Trans>Confirmed!</Trans>;
    let desc = <Trans>Mesh upgrade confirmed successfully</Trans>;
    if (errors?.length > 0) {
        icon = <MeshUpgradeErrorIcon />;
        title = <Trans>Confirmed with some errors</Trans>;
        desc = <Trans>Mesh upgrade confirmed with some errors</Trans>;
    }

    return (
        <UpgradeState title={title} icon={icon}>
            {desc}
            {errors?.length > 0 && <ParallelErrors errors={errors} />}
        </UpgradeState>
    );
};
