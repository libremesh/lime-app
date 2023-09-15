import { useMemo } from "preact/compat";

import { isValidCoordinate } from "plugins/lime-plugin-mesh-wide/src/lib/utils";
import {
    useMeshWideNodes,
    useMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";
import { INodes } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";

export const useNodes = () => {
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
                        nodeInfo.data.coordinates.lat,
                        nodeInfo.data.coordinates.lon
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

    return {
        hasInvalidNodes,
        allNodes: {
            meshWideNodesReference,
            meshWideNodesActual,
        },
        invalidNodes: {
            invalidNodesReference,
            invalidNodesActual,
        },
        locatedNodes: {
            locatedNodesReference,
            locatedNodesActual,
        },
    };
};
