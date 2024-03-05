import { Trans } from "@lingui/macro";

import { StatusMessage } from "components/status/statusMessage";

import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { useParallelScheduleUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";

import { ParallelMutationError } from "utils/meshWideSyncCall";

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
            {errors?.length > 0 && (
                <>
                    <StatusMessage status={"warning"}>
                        <Trans>Some nodes have errors:</Trans>
                    </StatusMessage>
                    <div
                        className={
                            "flex flex-col gap-3 mt-4 overflow-auto gap-4"
                        }
                    >
                        {errors.map((error, key) => {
                            if (error instanceof ParallelMutationError) {
                                return (
                                    <div key={key}>
                                        <strong>{error.ip}</strong>:{" "}
                                        {error.message}
                                    </div>
                                );
                            }
                            return <div key={key}>{error.toString()}</div>;
                        })}
                    </div>
                </>
            )}
        </>
    );
};
