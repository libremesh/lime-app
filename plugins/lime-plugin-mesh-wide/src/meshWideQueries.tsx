import { useQuery } from "@tanstack/react-query";

import {
    getMeshWideBatman,
    getMeshWideBatmanReference,
    getMeshWideLinks,
    getMeshWideLinksReference,
    getMeshWideNodes,
    getMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/meshWideApi";
import { getMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";
import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import {
    IBatmanLinks,
    IMeshWideConfig,
    INodes,
    IWifiLinks,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { useSharedData } from "utils/useSharedData";

export function useMeshWideLinksReference(params) {
    return useQuery<IWifiLinks>(
        meshUpgradeQueryKeys.wifiLinksInfoRef,
        getMeshWideLinksReference,
        {
            ...params,
        }
    );
}

export function useMeshWideLinks(params) {
    return useQuery<IWifiLinks>(
        meshUpgradeQueryKeys.wifiLinksInfo,
        getMeshWideLinks,
        {
            ...params,
        }
    );
}

export function useMeshWideBatmanReference(params) {
    return useQuery<IBatmanLinks>(
        meshUpgradeQueryKeys.batHostsRef,
        getMeshWideBatmanReference,
        {
            ...params,
        }
    );
}

export function useMeshWideBatman(params) {
    return useQuery<IBatmanLinks>(
        meshUpgradeQueryKeys.batHosts,
        getMeshWideBatman,
        {
            ...params,
        }
    );
}

export function useMeshWideNodesReference(params) {
    return useQuery<INodes>(
        meshUpgradeQueryKeys.meshWideNodesRef,
        getMeshWideNodesReference,
        {
            ...params,
        }
    );
}

export function useMeshWideNodes(params) {
    return useQuery<INodes>(
        meshUpgradeQueryKeys.meshWideNodes,
        getMeshWideNodes,
        {
            ...params,
        }
    );
}

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
