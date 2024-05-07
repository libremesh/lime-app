import { ComponentChildren, createContext } from "preact";
import { useMemo } from "preact/compat";
import { useContext } from "preact/hooks";

import { isValidCoordinate } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import {
    useMeshWideNodes,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueries";
import { INodes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

interface NodesContextType {
    hasInvalidNodes: boolean;
    allNodes: {
        meshWideNodesReference: INodes;
        meshWideNodesActual: INodes;
    };
    invalidNodes: {
        invalidNodesReference: INodes;
        invalidNodesActual: INodes;
    };
    locatedNodes: {
        locatedNodesReference: INodes;
        locatedNodesActual: INodes;
        allLocatedNodes: INodes;
        locatedNewNodes: INodes;
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

    const splitNodesByValidity = (
        nodeList: INodes
    ): { validNodes: INodes; invalidNodes: INodes } => {
        const validNodes: INodes = {};
        const invalidNodes: INodes = {};

        Object.entries(nodeList).forEach(([key, nodeInfo]) => {
            try {
                if (
                    isValidCoordinate(
                        nodeInfo.coordinates.lat,
                        nodeInfo.coordinates.long
                    )
                ) {
                    validNodes[key] = nodeInfo;
                } else {
                    invalidNodes[key] = nodeInfo;
                }
            } catch (e) {
                invalidNodes[key] = nodeInfo;
            }
        });

        return { validNodes, invalidNodes };
    };

    const {
        validNodes: locatedNodesReference,
        invalidNodes: invalidNodesReference,
    }: { validNodes: INodes; invalidNodes: INodes } | undefined =
        useMemo(() => {
            if (meshWideNodesReference)
                return splitNodesByValidity(meshWideNodesReference);
            return { validNodes: undefined, invalidNodes: undefined };
        }, [meshWideNodesReference]);

    const {
        validNodes: locatedNodesActual,
        invalidNodes: invalidNodesActual,
    }: { validNodes: INodes; invalidNodes: INodes } | undefined =
        useMemo(() => {
            if (meshWideNodesActual)
                return splitNodesByValidity(meshWideNodesActual);
            return { validNodes: undefined, invalidNodes: undefined };
        }, [meshWideNodesActual]);

    const hasInvalidNodes =
        (invalidNodesReference &&
            Object.keys(invalidNodesReference).length > 0) ||
        (invalidNodesActual && Object.keys(invalidNodesActual).length > 0);

    // This nodes are valid and not exists on the reference state
    let locatedNewNodes: INodes = {};
    if (locatedNodesActual) {
        locatedNewNodes = Object.keys(locatedNodesActual).reduce((obj, key) => {
            if (!meshWideNodesReference || !meshWideNodesReference[key]) {
                obj[key] = locatedNodesActual[key];
            }
            return obj;
        }, {} as INodes);
    }

    // Used to have on an a single list all the located nodes
    // This is used to have an easier way to draw links between nodes
    // that are not active, or not on reference or new
    const allLocatedNodes = {
        ...locatedNodesReference,
        ...locatedNodesActual,
        ...locatedNewNodes,
    };

    return (
        <NodesContext.Provider
            value={{
                hasInvalidNodes,
                allNodes: {
                    meshWideNodesReference,
                    meshWideNodesActual,
                },
                // Invalid nodes doesn't contain a correct lat long
                invalidNodes: {
                    invalidNodesReference,
                    invalidNodesActual,
                },
                locatedNodes: {
                    locatedNodesReference,
                    locatedNodesActual,
                    allLocatedNodes,
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
