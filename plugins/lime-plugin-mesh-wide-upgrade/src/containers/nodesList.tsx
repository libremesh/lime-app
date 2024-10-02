import { NodesListWrapper } from "components/mesh-wide-wizard/NodesListWrapper";

import NodeUpgradeInfoItem from "plugins/lime-plugin-mesh-wide-upgrade/src/components/nodeUpgradeInfo";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";

export const NodesList = () => {
    const { data, isLoading } = useMeshUpgrade();
    return (
        <NodesListWrapper
            data={data}
            isLoading={isLoading}
            NodeInfoComponent={NodeUpgradeInfoItem}
        />
    );
};
