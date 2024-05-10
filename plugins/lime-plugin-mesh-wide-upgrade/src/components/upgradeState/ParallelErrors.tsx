import { Trans } from "@lingui/macro";

import { StatusMessage } from "components/status/statusMessage";

import { RemoteNodeCallError, SyncCallErrors } from "utils/meshWideSyncCall";

export const ParallelErrors = ({ errors }: { errors: SyncCallErrors }) => {
    return (
        // Important to not add any style to this fragment because could add errors on growing on long lists
        <>
            <StatusMessage status={"warning"}>
                <Trans>Some nodes have errors:</Trans>
            </StatusMessage>
            <div className={"flex flex-col gap-3 mt-4 overflow-auto gap-4"}>
                {errors.map((error, key) => {
                    if (error instanceof RemoteNodeCallError) {
                        return (
                            <div key={key}>
                                <strong>{error.ip}</strong>: {error.message}
                            </div>
                        );
                    }
                    return <div key={key}>{error.toString()}</div>;
                })}
            </div>
        </>
    );
};
