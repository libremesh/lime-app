import { Trans } from "@lingui/macro";
import { useState } from "preact/hooks";

import Notification from "components/notifications/notification";

import { useNewVersion } from "plugins/lime-plugin-firmware/src/firmwareQueries";
import NextStepFooter from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nextStepFooter";
import { MeshWideUpgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/containers/MeshWideUpgradeStatus";
import { NodesList } from "plugins/lime-plugin-mesh-wide-upgrade/src/containers/NodesList";
import { useMeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";

import { useSession } from "utils/queries";

const MeshWideUpgrade = () => {
    const { data, isLoading } = useMeshWideUpgradeInfo({});
    const { data: session } = useSession();
    const { data: newVersionData } = useNewVersion({
        enabled: session?.username !== undefined,
    });
    const [showNodeList, setShowNodeList] = useState(false);

    // const newVersion = newVersionData && newVersionData.version;

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
            <NextStepFooter />
        </>
    );
};

export default MeshWideUpgrade;
