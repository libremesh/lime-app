import { ComponentChildren, createContext } from "preact";
import { useMemo } from "preact/compat";
import { useContext } from "preact/hooks";

import {
    ISplitNodesByLocated,
    splitNodesByLocated,
} from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import {
    useMeshWideNodes,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { INodes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { isEmpty } from "utils/utils";

interface NodesContextType {
    hasNonLocatedNodes: boolean;
    allNodes: {
        meshWideNodesReference: INodes;
        meshWideNodesActual: INodes;
    };
    // nonLocatedNodes doesn't contain a correct lat long
    nonLocatedNodes: INodes;
    locatedNodes: {
        locatedNodesReference: INodes; // All located reference nodes
        locatedNodesActual: INodes; // Located nodes of the actual state
        locatedNewNodes: INodes; // New nodes (not on the ref state)
    };
}

const NodesContext = createContext<NodesContextType>(null);

export const NodesProvider = ({
    children,
}: {
    children: ComponentChildren;
}) => {
    const { data: meshWideNodesReference } = useMeshWideNodesReference({});
    const { data: meshWideNodesActual } = useMeshWideNodes({});

    // It doesn't check the non located nodes on the reference state because it's not necessary
    // Is supposed that the reference state won't have a non located node
    const { locatedNodes: locatedNodesReference }: ISplitNodesByLocated =
        useMemo(() => {
            if (meshWideNodesReference) {
                return splitNodesByLocated(meshWideNodesReference);
            }
            return { locatedNodes: undefined, nonLocatedNodes: undefined };
        }, [meshWideNodesReference]);

    const {
        locatedNodes: locatedNodesActual,
        nonLocatedNodes,
    }: ISplitNodesByLocated | undefined = useMemo(() => {
        if (meshWideNodesActual) {
            return splitNodesByLocated(meshWideNodesActual);
        }
        return { locatedNodes: undefined, nonLocatedNodes: undefined };
    }, [meshWideNodesActual]);

    const hasNonLocatedNodes =
        nonLocatedNodes && Object.keys(nonLocatedNodes).length > 0;

    // This nodes are valid and not exists on the reference state
    let locatedNewNodes: INodes = {};
    if (locatedNodesActual) {
        locatedNewNodes = Object.keys(locatedNodesActual).reduce((obj, key) => {
            if (
                !meshWideNodesReference ||
                isEmpty(meshWideNodesReference) ||
                !meshWideNodesReference[key] ||
                (meshWideNodesReference[key] &&
                    isEmpty(meshWideNodesReference[key]))
            ) {
                obj[key] = locatedNodesActual[key];
            }
            return obj;
        }, {} as INodes);
    }

    return (
        <NodesContext.Provider
            value={{
                hasNonLocatedNodes,
                allNodes: {
                    meshWideNodesReference,
                    meshWideNodesActual,
                },
                nonLocatedNodes,
                locatedNodes: {
                    locatedNodesReference,
                    locatedNodesActual,
                    locatedNewNodes, // New nodes (not on the ref state)
                },
            }}
        >
            {children}
        </NodesContext.Provider>
    );
};

export const useNodes = () => {
    const context = useContext(NodesContext);
    if (context === null) {
        throw new Error("useNodesContext must be used within a NodesProvider");
    }
    return context;
};
