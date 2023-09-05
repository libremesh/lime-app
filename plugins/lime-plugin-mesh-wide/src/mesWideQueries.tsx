import { useQuery } from "@tanstack/react-query";

import {
    getMeshWideLinks,
    getMeshWideLinksReference,
    getMeshWideNodes,
    getMeshWideNodesReference,
} from "plugins/lime-plugin-mesh-wide/src/mesWideApi";
import {
    IMeshWideConfig,
    INodes,
    IWifiLinks,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";
import { getMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

import { useSharedData } from "utils/useSharedData";

// todo(kon): this is a mock
export function useMeshWideLinksReference(params) {
    return useQuery<IWifiLinks>(
        ["lime-meshwide", "links_reference"],
        getMeshWideLinksReference,
        {
            ...params,
        }
    );
}

export function useMeshWideLinks(params) {
    return useQuery<IWifiLinks>(["lime-meshwide", "links"], getMeshWideLinks, {
        ...params,
    });
}

export function useMeshWideNodesReference(params) {
    return useQuery<INodes>(
        ["lime-meshwide", "nodes_reference"],
        getMeshWideNodesReference,
        {
            ...params,
        }
    );
}

export function useMeshWideNodes(params) {
    return useQuery<INodes>(["lime-meshwide", "nodes"], getMeshWideNodes, {
        ...params,
    });
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
