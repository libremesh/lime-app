import { Trans } from "@lingui/macro";
import { useEffect } from "preact/hooks";

import {
    MeshUpgradeErrorIcon,
    MeshUpgradeSuccessIcon,
    ParallelErrors,
    StepState,
} from "components/mesh-wide-wizard/StepState";

import { useParallelConfirmUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

import queryCache from "utils/queryCache";

export const Confirmed = () => {
    const { errors } = useParallelConfirmUpgrade();
    let icon = <MeshUpgradeSuccessIcon />;
    let title = <Trans>Confirmed!</Trans>;
    let desc = <Trans>Mesh upgrade confirmed successfully</Trans>;

    // Invalidate confirmation banner queries to avoid showing the banner again
    useEffect(() => {
        queryCache.invalidateQueries(["lime-utils", "get_upgrade_info"]);
    }, []);

    if (errors?.length > 0) {
        icon = <MeshUpgradeErrorIcon />;
        title = <Trans>Confirmed with some errors</Trans>;
        desc = <Trans>Mesh upgrade confirmed with some errors</Trans>;
    }

    return (
        <StepState title={title} icon={icon}>
            {desc}
            {errors?.length > 0 && <ParallelErrors errors={errors} />}
        </StepState>
    );
};
