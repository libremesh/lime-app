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

    // Delete nodes that are not properly geolocated
    const filterNodeList = (nodeList: INodes): INodes => {
        return Object.entries(nodeList)
            .filter(([, v]) => {
                try {
                    return isValidCoordinate(
                        v.data.coordinates.lat,
                        v.data.coordinates.lon
                    );
                } catch (e) {
                    return false;
                }
            })
            .reduce((acc: INodes, [key, nodeInfo]) => {
                acc[key] = nodeInfo;
                return acc;
            }, {});
    };

    const geolocatedNodesReference: INodes = useMemo(() => {
        if (meshWideNodesReference)
            return filterNodeList(meshWideNodesReference);
    }, [meshWideNodesReference]);

    const geolocatedNodesActual: INodes = useMemo(() => {
        if (meshWideNodesActual) return filterNodeList(meshWideNodesActual);
    }, [meshWideNodesActual]);

    return {
        meshWideNodesReference,
        meshWideNodesActual,
        geolocatedNodesReference,
        geolocatedNodesActual,
    };
};
