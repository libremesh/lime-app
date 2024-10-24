import { Trans } from "@lingui/macro";

import {
    ParallelErrors,
    UpgradeState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeState";
import { useParallelConfirmUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const ConfirmationPending = () => {
    const { errors } = useParallelConfirmUpgrade();
    const title = (
        <Trans>
            Upgraded!
            <br />
            Awaiting confirmation
        </Trans>
    );

    return (
        <UpgradeState title={title}>
            <>
                <Trans>
                    Check if network is working properly and confirm the upgrade
                    <br />
                    If not confirmed, the upgrade will be rolled back after a
                    while
                </Trans>
                {errors?.length > 0 && <ParallelErrors errors={errors} />}
            </>
        </UpgradeState>
    );
};
