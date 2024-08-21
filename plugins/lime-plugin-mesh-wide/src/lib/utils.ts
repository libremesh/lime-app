import { INodes } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { isEmpty } from "utils/utils";

export const readableBytes = (bytes: number) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];

    if (bytes === 0) return "0 Byte";
    const i = parseInt(
        Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
        10
    );
    if (i === 0) return `${bytes} ${sizes[i]}`;

    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Get the strings that appear on the first array but not on the second one
 * @param array1
 * @param array2
 */
export const getArrayDifference = (array1: string[], array2: string[]) => {
    return array1.filter((item) => !array2.includes(item));
};

export const isValidCoordinate = (
    lat: number | string,
    lng: number | string
) => {
    return (
        (!isNaN(Number(lat)) || !isNaN(Number(lng))) &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
    );
};

export interface ISplitNodesByLocated {
    locatedNodes: INodes | undefined;
    nonLocatedNodes: INodes | undefined;
}

export const splitNodesByLocated = (nodeList: INodes): ISplitNodesByLocated => {
    const locatedNodes: INodes = {};
    const nonLocatedNodes: INodes = {};

    Object.entries(nodeList).forEach(([key, nodeInfo]) => {
        try {
            if (
                isValidCoordinate(
                    nodeInfo.coordinates.lat,
                    nodeInfo.coordinates.long
                )
            ) {
                locatedNodes[key] = nodeInfo;
            } else {
                nonLocatedNodes[key] = nodeInfo;
            }
        } catch (e) {
            nonLocatedNodes[key] = nodeInfo;
        }
    });

    return { locatedNodes, nonLocatedNodes };
};
