import { Trans } from "@lingui/macro";

import { StatusIcon } from "components/icons/status";
import WizardWrapper from "components/mesh-wide-wizard/WizardWrapper";
import Notification from "components/notifications/notification";

import NextStepFooter from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nextStepFooter";
import { MeshWideUpgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/containers/meshWideUpgradeStatus";
import { NodesList } from "plugins/lime-plugin-mesh-wide-upgrade/src/containers/nodesList";
import {
    MeshWideUpgradeProvider,
    useMeshUpgrade,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";

const BannerNotification = () => {
    const { thisNode } = useMeshUpgrade();
    return (
        <>
            <Notification title={"Mesh wide upgrade"}>
                <Trans>
                    Upgrade all network nodes at once. This proces will take a
                    while and will require user interaction.
                </Trans>
            </Notification>
            {thisNode.upgrade_state === "ABORTED" && (
                <div
                    className={
                        "flex flex-row gap-3 justify-start content-center px-4 py-4 w-full bg-primary-card "
                    }
                >
                    <StatusIcon status={"success"} />
                    <Trans>This node aborted successfully</Trans>
                </div>
            )}
        </>
    );
};

const MeshWideUpgrade = () => {
    const {
        data: meshWideNodes,
        isLoading: meshUpgradeLoading,
        thisNode,
        isError,
        error,
    } = useMeshUpgrade();

    const isLoading =
        meshUpgradeLoading ||
        meshWideNodes === undefined ||
        thisNode === undefined;

    return (
        <WizardWrapper
            error={error}
            isError={isError}
            isLoading={isLoading}
            banner={BannerNotification}
            statusPage={MeshWideUpgradeStatus}
            nodesList={NodesList}
            footer={NextStepFooter}
        />
    );
};

const MeshUpgradePage = () => {
    return (
        <MeshWideUpgradeProvider>
            <MeshWideUpgrade />
        </MeshWideUpgradeProvider>
    );
};

export default MeshUpgradePage;
