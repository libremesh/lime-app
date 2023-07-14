import Notification from "components/notifications/notification";

import NextStepFooter from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nextStepFooter";
import NodeUpgradeInfo from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nodeUpgradeInfo";
import { useMeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";

const MeshWideUpgrade = () => {
    const title = "Your Title";
    const description = "Your Description";
    const info = "info";

    const { data } = useMeshWideUpgradeInfo({});

    return (
        <>
            <div className={"flex flex-col gap-1 w-full"}>
                <Notification
                    title={"Upgrade available!"}
                    right={"10 November"}
                >
                    Some of the network nodes can be upgraded! Press the button
                    to download the software.
                </Notification>

                {data &&
                    Object.entries(data.result).map(
                        ([key, nodeInfo], index) => {
                            return (
                                <div key={index}>
                                    <NodeUpgradeInfo
                                        name={key}
                                        info={nodeInfo}
                                    />
                                </div>
                            );
                        }
                    )}
            </div>
            <NextStepFooter />
        </>
    );
};

export default MeshWideUpgrade;
