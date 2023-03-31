import { useMutation, useQuery } from "@tanstack/react-query";

import {
    changeLocation,
    getLocation,
    getNodesandlinks,
} from "plugins/lime-plugin-locate/src/locateApi";

export interface INodeLocation {
    location: {
        lon: string;
        lat: string;
    };
    default: boolean;
}

export function useLocation(params) {
    return useQuery<INodeLocation>(["lime-location", "get"], getLocation, {
        placeholderData: {
            default: false,
            location: {
                lon: "FIXME",
                lat: "FIXME",
            },
        },
        // select: (res) => {
        //     // Neither community nor node has location configured
        //     const latlong = res.location;
        //     if (latlong["lon"] === "FIXME" || latlong["lat"] === "FIXME") {
        //         latlong = null;
        //     }
        //     // return latlong;
        //     return {
        //         station: payload.location || payload,
        //         isCommunity: payload.default || false,
        //     };
        // },
        ...params,
    });
}

export function useNodesandlinks(params) {
    return useQuery(
        ["lime-location", "all_nodes_and_links"],
        getNodesandlinks,
        {
            ...params,
        }
    );
}

interface IChangeUserParams {
    lat: number;
    lon: number;
}

export function useChangeLocation(params) {
    return useMutation<void, unknown, IChangeUserParams, unknown>({
        mutationFn: changeLocation,
        ...params,
    });
}
