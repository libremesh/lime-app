import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";

import Loading from "components/loading";
import Notification from "components/notifications/notification";

import NextStepFooter from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nextStepFooter";
import { MeshWideUpgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/containers/meshWideUpgradeStatus";
import { NodesList } from "plugins/lime-plugin-mesh-wide-upgrade/src/containers/nodesList";
import {
    MeshWideUpgradeProvider,
    useMeshUpgrade,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";

const MeshWideUpgrade = () => {
    const {
        data: meshWideNodes,
        isLoading,
        newVersionAvailable,
        thisNode,
    } = useMeshUpgrade();
    const [showNodeList, setShowNodeList] = useState(false);

    if (isLoading || meshWideNodes === undefined || thisNode === undefined) {
        return <Loading />;
    }

    return (
        <>
            <div className={"flex flex-col gap-1 w-full"}>
                <Notification
                    title={"Mesh wide upgrade"}
                    right={
                        <div
                            onClick={() => setShowNodeList(!showNodeList)}
                            className={"cursor-pointer"}
                        >
                            <Trans>Show nodes</Trans>
                        </div>
                    }
                >
                    <Trans>
                        Upgrade all network nodes at once. This proces will take
                        a while and will require user interaction.
                    </Trans>
                </Notification>
                {showNodeList && <NodesList />}
                {!showNodeList && <MeshWideUpgradeStatus />}
            </div>
            {newVersionAvailable && <NextStepFooter />}
        </>
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
