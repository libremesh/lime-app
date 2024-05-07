import { Trans } from "@lingui/macro";

import { ParallelErrors } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/ParallelErrors";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { useParallelScheduleUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const UpgradeScheduled = () => {
    const { totalNodes } = useMeshUpgrade();
    const { errors, results } = useParallelScheduleUpgrade();
    const nodesToBeUpgraded = results.length;

    return (
        <>
            <div className="text-4xl mb-4">
                <Trans>Upgrade is scheduled!</Trans>
            </div>
            <div className="text-2xl mb-6">
                <Trans>
                    {nodesToBeUpgraded} of {totalNodes} will be upgraded
                </Trans>
            </div>
            {errors?.length > 0 && <ParallelErrors errors={errors} />}
        </>
    );
};
