import NodeMarker from "plugins/lime-plugin-mesh-wide/src/components/Map/NodeMarker";
import { useNodes } from "plugins/lime-plugin-mesh-wide/src/hooks/useNodes";
import { INodeInfo } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

const NodesLayer = () => {
    const {
        locatedNodes: {
            locatedNodesReference,
            locatedNodesActual,
            locatedNewNodes,
        },
    } = useNodes();

    return (
        <>
            {locatedNodesReference &&
                Object.entries(locatedNodesReference).map(([k, v], i) => {
                    let actualNode: INodeInfo;
                    if (locatedNodesActual) {
                        actualNode = locatedNodesActual[k];
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
        </>
    );
};

export default NodesLayer;
