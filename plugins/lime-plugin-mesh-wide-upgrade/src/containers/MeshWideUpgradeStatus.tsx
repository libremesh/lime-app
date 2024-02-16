import { DownloadingMain } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/DownloadingMain";
import { ErrorState } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/ErrorState";
import { NewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NewVersionAvailable";
import { NoNewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NoNewVersion";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/MeshWideUpgradeProvider";

const MeshWideUpgradeStatusState = () => {
    const { stepperState, meshWideError } = useMeshUpgrade();

    if (stepperState === "ERROR") {
        return <ErrorState msg={meshWideError.errorMessage} />;
    } else if (stepperState === "UPDATE_AVAILABLE") {
        return <NewVersionAvailable />;
    } else if (stepperState === "DOWNLOADING_MAIN") {
        return <DownloadingMain />;
    } else if (stepperState === "DOWNLOADED_MAIN") {
        return <NewVersionAvailable readyForUpgrade />;
    } else if (stepperState === "TRANSACTION_STARTED") {
        return <>Transaction started!</>;
    } else if (stepperState === "UPGRADE_SCHEDULED") {
        return <>todo</>;
    } else if (stepperState === "CONFIRMATION_PENDING") {
        return <>todo</>;
    } else if (stepperState === "CONFIRMED") {
        return <>todo</>;
    }
    return <NoNewVersionAvailable />;
};

export const MeshWideUpgradeStatus = () => {
    return (
        <div className="container container-center">
            <MeshWideUpgradeStatusState />
        </div>
    );
};
