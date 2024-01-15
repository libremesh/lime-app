import Loading from "components/loading";

import NodeUpgradeInfoItem from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nodeUpgradeInfo";
import { useMeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/mesWideUpgradeQueries";

export const NodesList = () => {
    const { data, isLoading } = useMeshWideUpgradeInfo({});

    if (isLoading || data === undefined) {
        return <Loading />;
    }

    return (
        <>
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
        </>
    );
};
