import { Trans } from "@lingui/macro";

import { ParallelErrors } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/ParallelErrors";
import { useParallelConfirmUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const ConfirmationPending = () => {
    const { errors } = useParallelConfirmUpgrade();

    return (
        <>
            <div className="text-4xl mb-4">
                <Trans>Upgrade done</Trans>
            </div>
            <div className="text-2xl mb-6">
                <Trans>
                    Check if network is working properly and confirm the upgrade
                    <br />
                    If not confirmed, the upgrade will be rolled back after a
                    while
                </Trans>
            </div>
            {errors?.length > 0 && <ParallelErrors errors={errors} />}
        </>
    );
};
