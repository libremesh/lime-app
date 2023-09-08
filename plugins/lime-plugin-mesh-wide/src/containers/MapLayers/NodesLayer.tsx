import NodeMarker from "plugins/lime-plugin-mesh-wide/src/components/Map/NodeMarker";
import {
    useMeshWideNodes,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

const NodesLayer = () => {
    const { data: meshWideNodesReference } = useMeshWideNodesReference({});
    const { data: meshWideNodesActual } = useMeshWideNodes({});

    return (
        <>
            {meshWideNodesReference &&
                Object.entries(meshWideNodesReference).map(([k, v], i) => {
                    let actualNode: INodeInfo;
                    if (meshWideNodesActual) {
                        actualNode = meshWideNodesActual[k];
                    }
                    return (
                        <NodeMarker
                            key={i}
                            reference={v}
                            actual={actualNode}
                            name={k}
                        />
                    );
                })}
        </>
    );
};

export default NodesLayer;
