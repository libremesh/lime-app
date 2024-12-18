import { Trans } from "@lingui/macro";

import {
    ParallelErrors,
    StepState,
} from "components/mesh-wide-wizard/StepState";

import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { useParallelConfirmUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const ConfirmationPending = () => {
    const { thisNode } = useMeshUpgrade();
    const { errors } = useParallelConfirmUpgrade();
    const title = (
        <Trans>
            Upgraded!
            <br />
            Awaiting confirmation
        </Trans>
    );

    return (
        <StepState title={title}>
            <>
                <Trans>
                    Check if network is working properly and confirm the upgrade
                    <br />
                    If not confirmed, the upgrade will be rolled back after a
                    while
                </Trans>
                <br />
                {thisNode.confirm_remaining > 0 && (
                    <Trans>
                        {thisNode.confirm_remaining} seconds remaining
                    </Trans>
                )}
                {errors?.length > 0 && <ParallelErrors errors={errors} />}
            </>
        </StepState>
    );
};
