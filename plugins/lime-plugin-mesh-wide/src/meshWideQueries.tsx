import { useMutation, useQuery } from "@tanstack/react-query";

import { getSharedStateApiCall } from "plugins/lime-plugin-mesh-wide/src/meshWideApi";
import { getMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";
import { getFromSharedStateKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import {
    DataTypes,
    IBatmanLinks,
    IMeshWideConfig,
    INodes,
    IWifiLinks,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { useSharedData } from "utils/useSharedData";

export function useMeshWideLinksReference(params) {
    const dataType: DataTypes = "wifi_links_info";
    const queryKey =
        getFromSharedStateKeys.getFromSharedStateMultiWriter(dataType);
    return useQuery<IWifiLinks>(
        queryKey,
        () => getSharedStateApiCall<typeof dataType>(queryKey),
        {
            ...params,
        }
    );
}

export function useMeshWideLinks(params) {
    const dataType: DataTypes = "wifi_links_info";
    const queryKey = getFromSharedStateKeys.getFromSharedStateAsync(dataType);
    return useQuery<IWifiLinks>(
        queryKey,
        () => getSharedStateApiCall<typeof dataType>(queryKey),
        {
            ...params,
        }
    );
}

export function useMeshWideBatmanReference(params) {
    const dataType: DataTypes = "bat_links_info";
    const queryKey =
        getFromSharedStateKeys.getFromSharedStateMultiWriter(dataType);
    return useQuery<IBatmanLinks>(
        queryKey,
        () => getSharedStateApiCall<typeof dataType>(queryKey),
        {
            ...params,
        }
    );
}

export function useMeshWideBatman(params) {
    const dataType: DataTypes = "bat_links_info";
    const queryKey = getFromSharedStateKeys.getFromSharedStateAsync(dataType);
    return useQuery<IBatmanLinks>(
        queryKey,
        () => getSharedStateApiCall<typeof dataType>(queryKey),
        {
            ...params,
        }
    );
}

export function useMeshWideNodesReference(params) {
    const dataType: DataTypes = "node_info";
    const queryKey =
        getFromSharedStateKeys.getFromSharedStateMultiWriter(dataType);
    return useQuery<INodes>(
        queryKey,
        () => getSharedStateApiCall<typeof dataType>(queryKey),
        {
            ...params,
        }
    );
}

export function useMeshWideNodes(params) {
    const dataType: DataTypes = "node_info";
    const queryKey = getFromSharedStateKeys.getFromSharedStateAsync(dataType);
    return useQuery<INodes>(
        queryKey,
        () => getSharedStateApiCall<typeof dataType>(queryKey),
        {
            ...params,
        }
    );
}

/**
 * Insert into shared state
 *
 * Don't use those mutations itself, use it implementing it on the useReferenceState hook in order
 * to unify criterias and add a confirmation modal
 */

export const useSetNodeInfoReferenceState = (params) => {
    const type = "node_info";
    const { data } = useMeshWideNodes({});
    const queryKey = getFromSharedStateKeys.insertIntoSharedStateKey(
        type,
        data
    );
    return useMutation(
        queryKey,
        () => getSharedStateApiCall<typeof type>(queryKey),
        {
            ...params,
        }
    );
};

export const useSetWifiLinksInfoReferenceState = (params) => {
    const type = "wifi_links_info";
    const { data } = useMeshWideLinks({});
    const queryKey = getFromSharedStateKeys.insertIntoSharedStateKey(
        type,
        data
    );
    return useMutation(
        queryKey,
        () => getSharedStateApiCall<typeof type>(queryKey),
        {
            ...params,
        }
    );
};

export const useSetBatmanLinksInfoReferenceState = (params) => {
    const type = "bat_links_info";
    const { data } = useMeshWideBatman({});
    const queryKey = getFromSharedStateKeys.insertIntoSharedStateKey(
        type,
        data
    );
    return useMutation(
        queryKey,
        () => getSharedStateApiCall<typeof type>(queryKey),
        {
            ...params,
        }
    );
};

/**
 * Set mesh wide config
 */

export function useMeshWideConfig(params) {
    return useQuery<IMeshWideConfig>(
        ["lime-meshwide", "get_mesh_config"],
        getMeshWideConfig,
        {
            ...params,
        }
    );
}

/**
 * This query is used to store the selected feature on the map.
 *
 * Used to store the state between components.
 */
export const useSelectedMapFeature = () => {
    return useSharedData<SelectedMapFeature>([
        "lime-meshwide",
        "select_map_feature",
    ]);
};
