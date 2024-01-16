import Loading from "components/loading";

import NodeUpgradeInfoItem from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nodeUpgradeInfo";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/MeshWideUpgradeProvider";

export const NodesList = () => {
    const { data, isLoading } = useMeshUpgrade();

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
