import { Trans } from "@lingui/macro";

import { ErrorState } from "components/mesh-wide-wizard/ErrorState";
import { LoadingPage } from "components/mesh-wide-wizard/LoadingPage";

import {
    ConfirmationPending,
    Confirmed,
    DefaultState,
    RadyForApply,
    RestartScheduled,
} from "plugins/lime-plugin-mesh-wide-config/src/components/StepStates";
import { useMeshConfig } from "plugins/lime-plugin-mesh-wide-config/src/providers/useMeshConfigProvider";

const StatusPage = () => {
    const { wizardState, nodeInfo } = useMeshConfig();

    switch (wizardState) {
        case "ERROR":
            return <ErrorState msg={nodeInfo?.error.toString()} />;
        case "READY_FOR_APPLY":
            return <RadyForApply />;
        case "RESTART_SCHEDULED":
            return <RestartScheduled />;
        case "CONFIRMED":
            return <Confirmed />;
        case "ABORTING":
            return (
                <LoadingPage
                    title={<Trans>Aborting</Trans>}
                    description={
                        <Trans>
                            Sending abort message to this node. The abort order
                            will be propagated to all nodes.
                        </Trans>
                    }
                />
            );
        case "CONFIRMATION_PENDING":
            return <ConfirmationPending />;
        case "SENDING_START_SCHEDULE":
            return (
                <LoadingPage
                    title={<Trans>Scheduling apply configuration</Trans>}
                    description={
                        <Trans>
                            Schedule apply configuration to all available nodes
                        </Trans>
                    }
                />
            );
        case "SENDING_CONFIRMATION":
            return (
                <LoadingPage
                    title={<Trans>Sending confirmation</Trans>}
                    description={
                        <Trans>
                            Confirming new configuration to available nodes
                        </Trans>
                    }
                />
            );
        case "DEFAULT":
        default:
            return <DefaultState />;
    }
};

export default StatusPage;
