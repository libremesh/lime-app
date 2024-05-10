import { Trans } from "@lingui/macro";

import { GlobeIcon } from "components/icons/globeIcon";

import { ParallelErrors } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/ParallelErrors";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { useParallelScheduleUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const UpgradeScheduled = () => {
    const { totalNodes } = useMeshUpgrade();
    const { errors, results } = useParallelScheduleUpgrade();
    const nodesToBeUpgraded = results?.length;

    return (
        <div className={"flex flex-col items-center gap-4"}>
            <GlobeIcon size={80} className={`fill-internet`} />

            <div className="text-4xl font-bold">
                <Trans>Upgrade is scheduled!</Trans>
            </div>
            <div className="text-2xl mb-6">
                <Trans>
                    {nodesToBeUpgraded} of {totalNodes} will be upgraded
                </Trans>
            </div>
            {errors?.length > 0 && <ParallelErrors errors={errors} />}
        </div>
    );
};
