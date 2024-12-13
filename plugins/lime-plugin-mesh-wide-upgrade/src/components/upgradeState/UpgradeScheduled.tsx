import { Trans } from "@lingui/macro";

import {
    ParallelErrors,
    StepState,
} from "components/mesh-wide-wizard/StepState";

import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { useParallelScheduleUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const UpgradeScheduled = () => {
    const { totalNodes } = useMeshUpgrade();
    const { errors, results } = useParallelScheduleUpgrade();
    const nodesToBeUpgraded = results?.length;

    return (
        <StepState title={<Trans>Upgrade is scheduled!</Trans>}>
            <>
                <Trans>
                    {nodesToBeUpgraded} of {totalNodes} will be upgraded
                </Trans>
                {errors?.length > 0 && <ParallelErrors errors={errors} />}
            </>
        </StepState>
    );
};
