import NodeMarker from "plugins/lime-plugin-mesh-wide/src/components/Map/NodeMarker";
import { useMeshWideNodesReference } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

const NodesLayer = () => {
    const { data: meshWideNodesReference } = useMeshWideNodesReference({});

    return (
        <>
            {meshWideNodesReference &&
                Object.entries(meshWideNodesReference).map(([k, v], i) => {
                    return <NodeMarker key={i} info={v} name={k} />;
                })}
        </>
    );
};

export default NodesLayer;
