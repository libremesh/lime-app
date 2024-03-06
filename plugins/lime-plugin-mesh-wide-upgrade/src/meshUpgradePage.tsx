import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";

import Loading from "components/loading";
import Notification from "components/notifications/notification";

import NextStepFooter from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nextStepFooter";
import { ErrorState } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/upgradeState/ErrorState";
import { MeshWideUpgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/containers/meshWideUpgradeStatus";
import { NodesList } from "plugins/lime-plugin-mesh-wide-upgrade/src/containers/nodesList";
import {
    MeshWideUpgradeProvider,
    useMeshUpgrade,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import { CenterFlex } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/divs";

const MeshWideUpgrade = () => {
    const {
        data: meshWideNodes,
        isLoading,
        thisNode,
        isError,
    } = useMeshUpgrade();
    const [showNodeList, setShowNodeList] = useState(false);

    if (isError) {
        return (
            <CenterFlex>
                <ErrorState
                    msg={
                        <Trans>
                            Errors found getting mesh info!
                            <br />
                            Is mesh upgrade package installed?
                            <br />
                            Contact with your network administrators
                        </Trans>
                    }
                />
            </CenterFlex>
        );
    }

    if (isLoading || meshWideNodes === undefined || thisNode === undefined) {
        return (
            <CenterFlex>
                <Loading />
            </CenterFlex>
        );
    }

    return (
        <div className={"flex flex-col h-full w-full max-h-full"}>
            <Notification
                title={"Mesh wide upgrade"}
                right={
                    <div
                        onClick={() => setShowNodeList(!showNodeList)}
                        className={"cursor-pointer"}
                    >
                        {showNodeList ? (
                            <Trans>Show state</Trans>
                        ) : (
                            <Trans>Show nodes</Trans>
                        )}
                    </div>
                }
            >
                <Trans>
                    Upgrade all network nodes at once. This proces will take a
                    while and will require user interaction.
                </Trans>
            </Notification>
            <div className={"flex-grow overflow-auto max-h-full w-full"}>
                {showNodeList && <NodesList />}
                {!showNodeList && <MeshWideUpgradeStatus />}
            </div>
            <NextStepFooter />
        </div>
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
