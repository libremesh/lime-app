import Loading from "components/loading";
import Notification from "components/notifications/notification";

import NextStepFooter from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nextStepFooter";
import NodeUpgradeInfoItem from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nodeUpgradeInfo";
import { useMeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";

const MeshWideUpgrade = () => {
    const { data, isLoading } = useMeshWideUpgradeInfo({});

    if (isLoading || data === undefined) {
        return <Loading />;
    }

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
                    Object.entries(data).map(([key, nodeInfo], index) => {
                        return (
                            <NodeUpgradeInfoItem
                                key={index}
                                name={key}
                                info={nodeInfo}
                            />
                        );
                    })}
            </div>
            <NextStepFooter />
        </>
    );
};

export default MeshWideUpgrade;
