import { useQuery } from "@tanstack/react-query";

import {
    IMeshWideConfig,
    IMeshWideStatusResponse,
    SelectedMapFeature,
} from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";
import {
    getMeshWideConfig,
    getRadioData,
} from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

import { useSharedData } from "utils/useSharedData";

// todo(kon): this is a mock
export function useMeshWide(params) {
    return useQuery<IMeshWideStatusResponse>(
        ["lime-meshwide", "get_mesh_info"],
        getRadioData,
        {
            ...params,
        }
    );
}

// todo(kon): this is a mock
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
    // const { data: selectedMapFeature } = useQuery<SelectedMapFeature | null>(
    //     ["lime-meshwide", "select_map_feature"],
    //     () => null
    // );
    // const setSelectedMapFeature = (selected: SelectedMapFeature) =>
    //     queryCache.setQueryData(
    //         ["lime-meshwide", "select_map_feature"],
    //         selected
    //     );
    // return { selectedMapFeature, setSelectedMapFeature };
    return useSharedData<SelectedMapFeature>([
        "lime-meshwide",
        "select_map_feature",
    ]);
};
