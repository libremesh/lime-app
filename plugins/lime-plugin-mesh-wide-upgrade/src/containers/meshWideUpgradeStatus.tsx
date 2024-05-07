import { Trans } from "@lingui/macro";

import { ConfirmationPending } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/ConfirmationPending";
import { ErrorState } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/ErrorState";
import { LoadingPage } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/LoadingPage";
import { NewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NewVersionAvailable";
import { NoNewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NoNewVersion";
import { TransactionStarted } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/TransactionStarted";
import { UpgradeScheduled } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/UpgradeScheduled";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { CenterFlex } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/divs";

const MeshWideUpgradeStatusState = () => {
    const { stepperState, meshWideError } = useMeshUpgrade();

    switch (stepperState) {
        case "ERROR":
            return <ErrorState msg={meshWideError?.errorMessage.toString()} />;
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
        case "UPDATE_AVAILABLE":
            return <NewVersionAvailable />;
        case "DOWNLOADING_MAIN":
            return <LoadingPage title={<Trans>Downloading</Trans>} />;
        case "DOWNLOADED_MAIN":
            return <NewVersionAvailable readyForUpgrade />;
        case "TRANSACTION_STARTED":
        case "NODES_DOWNLOADING":
            return <TransactionStarted />;
        case "SENDING_START_SCHEDULE":
            return (
                <LoadingPage
                    title={<Trans>Scheduling upgrade</Trans>}
                    description={
                        <Trans>Schedule upgrade to all available nodes</Trans>
                    }
                />
            );
        case "UPGRADING":
            return (
                <LoadingPage
                    title={<Trans>Node is upgrading</Trans>}
                    description={<Trans>Await until it reboots</Trans>}
                />
            );
        case "UPGRADE_SCHEDULED":
            return <UpgradeScheduled />;
        case "SENDING_CONFIRMATION":
            return (
                <LoadingPage
                    title={<Trans>Sending confirmation</Trans>}
                    description={<Trans>Confirming all upgraded nodes</Trans>}
                />
            );
        case "CONFIRMATION_PENDING":
            return <ConfirmationPending />;
        case "CONFIRMED":
            return <>Confirmed!</>;
        default:
            return <NoNewVersionAvailable />;
    }
};

export const MeshWideUpgradeStatus = () => {
    return (
        <CenterFlex>
            <MeshWideUpgradeStatusState />
        </CenterFlex>
    );
};
