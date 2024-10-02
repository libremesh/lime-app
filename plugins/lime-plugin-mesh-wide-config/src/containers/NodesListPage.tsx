import { NodesListWrapper } from "components/mesh-wide-wizard/NodesListWrapper";

import { useMeshWideConfigState } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigQueries";
import { MeshWideNodeConfigInfo } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

const NodeConfigItem = ({
    info,
    name,
}: {
    info: MeshWideNodeConfigInfo;
    name: string;
}) => {
    return <>test</>;
};

const NodesListPage = () => {
    const { data, isLoading } = useMeshWideConfigState({});
    return (
        <NodesListWrapper
            data={data}
            isLoading={isLoading}
            NodeInfoComponent={NodeConfigItem}
        />
    );
};

export default NodesListPage;
