import { Trans } from "@lingui/macro";

import { StatusMessage } from "components/status/statusMessage";

import { useScheduleMeshSafeUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

export const UpgradeScheduled = () => {
    const { errors, results } = useScheduleMeshSafeUpgrade();

    return (
        <>
            <div className="text-4xl">
                <Trans>Upgrade is scheduled!</Trans>
            </div>
            <div className="text-2xl">
                <Trans>`{results.length} will be upgraded`</Trans>
            </div>
            {errors?.length > 0 && (
                <StatusMessage status={"warning"}>
                    <Trans>Some nodes have errors</Trans>
                </StatusMessage>
            )}
        </>
    );
};
