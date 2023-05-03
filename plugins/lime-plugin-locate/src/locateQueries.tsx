import { useMutation, useQuery } from "@tanstack/react-query";

import { loadLeafLet } from "plugins/lime-plugin-locate/src/leafletUtils";
import {
    changeLocation,
    getLocation,
    getNodesandlinks,
} from "plugins/lime-plugin-locate/src/locateApi";

import queryCache from "utils/queryCache";

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
        onSuccess: (data: { lat: string; lon: string }) => {
            queryCache.setQueryData(
                ["lime-location", "get"],
                (oldData: INodeLocation) =>
                    oldData
                        ? {
                              ...oldData,
                              location: {
                                  lat: data.lat,
                                  lon: data.lon,
                              },
                          }
                        : oldData
            );
        },
        ...params,
    });
}

export function useLoadLeaflet(params) {
    return useQuery(["lime-location", "load_leaflet"], loadLeafLet, {
        ...params,
    });
}
