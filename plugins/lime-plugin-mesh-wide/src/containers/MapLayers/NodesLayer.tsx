import NodeMarker from "plugins/lime-plugin-mesh-wide/src/components/Map/NodeMarker";
import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

const NodesLayer = () => {
    const {
        locatedNodes: {
            locatedNodesReference: meshWideNodesReference,
            locatedNodesActual: meshWideNodesActual,
        },
    } = useNodes();

    return (
        <div>
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
        </div>
    );
};

export default NodesLayer;
