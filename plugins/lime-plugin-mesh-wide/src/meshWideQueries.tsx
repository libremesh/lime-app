import { useMutation, useQuery } from "@tanstack/react-query";

import {
    doSharedStateApiCall,
    syncAllDataTypes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideApi";
import { getMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";
import {
    getFromSharedStateKeys,
    syncFromSharedStateKey,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import {
    DataTypes,
    IBatmanLinks,
    IMeshWideConfig,
    INodes,
    IWifiLinks,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { useSharedData } from "utils/useSharedData";

const refetchInterval = 60000;

export function useMeshWideLinksReference(params) {
    const dataType: DataTypes = "wifi_links_info";
    const queryKey =
        getFromSharedStateKeys.getReferenceFromSharedState(dataType);
    return useQuery<IWifiLinks>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideLinks(params) {
    const dataType: DataTypes = "wifi_links_info";
    const queryKey = getFromSharedStateKeys.getFromSharedState(dataType);
    return useQuery<IWifiLinks>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideBatmanReference(params) {
    const dataType: DataTypes = "bat_links_info";
    const queryKey =
        getFromSharedStateKeys.getReferenceFromSharedState(dataType);
    return useQuery<IBatmanLinks>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideBatman(params) {
    const dataType: DataTypes = "bat_links_info";
    const queryKey = getFromSharedStateKeys.getFromSharedState(dataType);
    return useQuery<IBatmanLinks>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideNodesReference(params) {
    const dataType: DataTypes = "node_info";
    const queryKey =
        getFromSharedStateKeys.getReferenceFromSharedState(dataType);
    return useQuery<INodes>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
            ...params,
        }
    );
}

export function useMeshWideNodes(params) {
    const dataType: DataTypes = "node_info";
    const queryKey = getFromSharedStateKeys.getFromSharedState(dataType);
    return useQuery<INodes>(
        queryKey,
        () => doSharedStateApiCall<typeof dataType>(queryKey),
        {
            refetchInterval,
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

interface IShatedStateRemoteQueryProps {
    ip: string;
    hostname?: string;
    params?: any;
}

export const useSetNodeInfoReferenceState = ({
    ip,
    hostname,
    params,
}: IShatedStateRemoteQueryProps) => {
    const type = "node_info";
    const { data } = useMeshWideNodes({});
    const queryKey = getFromSharedStateKeys.insertIntoReferenceState(type, {
        [hostname]: data[hostname],
    });
    return useMutation(
        queryKey,
        () => doSharedStateApiCall<typeof type>(queryKey, ip),
        {
            ...params,
        }
    );
};

export const useSetWifiLinksInfoReferenceState = ({
    ip,
    hostname,
    params,
}: IShatedStateRemoteQueryProps) => {
    const type = "wifi_links_info";
    const { data } = useMeshWideLinks({});
    const queryKey = getFromSharedStateKeys.insertIntoReferenceState(type, {
        [hostname]: data[hostname],
    });
    return useMutation(
        queryKey,
        () => doSharedStateApiCall<typeof type>(queryKey, ip),
        {
            ...params,
        }
    );
};

export const useSetBatmanLinksInfoReferenceState = ({
    ip,
    hostname,
    params,
}: IShatedStateRemoteQueryProps) => {
    const type = "bat_links_info";
    const { data } = useMeshWideBatman({});
    const queryKey = getFromSharedStateKeys.insertIntoReferenceState(type, {
        [hostname]: data[hostname],
    });
    return useMutation(
        queryKey,
        () => doSharedStateApiCall<typeof type>(queryKey, ip),
        {
            ...params,
        }
    );
};

/**
 * Sync all data types from shared state from remote node
 * */

export const usePublishOnRemoteNode = ({
    ip,
    hostname,
    ...opts
}: IShatedStateRemoteQueryProps) => {
    return useMutation<any, any, { ip: string }>({
        mutationFn: ({ ip }) =>
            doSharedStateApiCall(
                getFromSharedStateKeys.publishAllFromSharedState(),
                ip
            ),
        mutationKey: [getFromSharedStateKeys.publishAllFromSharedState(), ip],
        ...opts,
    });
};

export const useSyncDataTypes = ({
    ip,
    ...opts
}: IShatedStateRemoteQueryProps) => {
    return useMutation(syncAllDataTypes, {
        mutationKey: [syncFromSharedStateKey, ip],
        ...opts,
    });
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
