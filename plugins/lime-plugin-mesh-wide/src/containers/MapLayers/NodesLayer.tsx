import NodeMarker from "plugins/lime-plugin-mesh-wide/src/components/Map/NodeMarker";
import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

import { isEmpty } from "utils/utils";

const NodesLayer = () => {
    const {
        locatedNodes: {
            locatedNodesReference: meshWideNodesReference,
            locatedNodesActual: meshWideNodesActual,
        },
    } = useNodes();

    // If reference is not set or empty, use actual nodes
    const referenceNodes =
        meshWideNodesReference && isEmpty(meshWideNodesReference)
            ? meshWideNodesActual
            : meshWideNodesReference;

    return (
        <div>
            {referenceNodes &&
                Object.entries(referenceNodes).map(([k, v], i) => {
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
