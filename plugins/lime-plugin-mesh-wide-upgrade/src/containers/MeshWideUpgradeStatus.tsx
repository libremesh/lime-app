import { DownloadingMain } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/DownloadingMain";
import { NewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NewVersionAvailable";
import { NoNewVersionAvailable } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/NoNewVersion";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/MeshWideUpgradeProvider";

const MeshWideUpgradeStatusState = () => {
    const { stepperState, becomeMainNode } = useMeshUpgrade();

    if (stepperState === "UPDATE_AVAILABLE") {
        return <NewVersionAvailable />;
    } else if (stepperState === "DOWNLOADING_MAIN") {
        return <DownloadingMain />;
    } else if (stepperState === "DOWNLOADED_MAIN") {
        return <NewVersionAvailable readyForUpgrade />;
    } else if (stepperState === "TRANSACTION_STARTED") {
        return <>todo</>;
    } else if (stepperState === "READY_FOR_UPGRADE") {
        return <>todo</>;
    } else if (stepperState === "UPGRADE_SCHEDULED") {
        return <>todo</>;
    } else if (stepperState === "CONFIRMATION_PENDING") {
        return <>todo</>;
    } else if (stepperState === "CONFIRMED") {
        return <>todo</>;
    } else if (stepperState === "ERROR") {
        return <>todo</>;
    }
    // if (stepperState === "UPDATE_AVAILABLE") {
    //     return <NewVersionAvailable />;
    // } else if (stepperState === "DOWNLOADED_MAIN") {
    //     return <NewVersionAvailable />;
    // }
    return <NoNewVersionAvailable />;
};

export const MeshWideUpgradeStatus = () => {
    return (
        <div className="container container-center">
            <MeshWideUpgradeStatusState />
        </div>
    );
};
