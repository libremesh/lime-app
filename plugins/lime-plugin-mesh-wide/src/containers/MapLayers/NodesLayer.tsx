import NodeMarker from "plugins/lime-plugin-mesh-wide/src/components/Map/NodeMarker";
import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

const NodesLayer = () => {
    const {
        locatedNodes: {
            locatedNodesReference: referenceNodes,
            locatedNodesActual: meshWideNodesActual,
            locatedNewNodes,
        },
    } = useNodes();

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
            {locatedNewNodes &&
                Object.entries(locatedNewNodes).map(([k, v], i) => {
                    return <NodeMarker key={i} actual={v} name={k} />;
                })}
        </div>
    );
};

export default NodesLayer;
