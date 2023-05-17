import { useMutation, useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query/src/types";

import { upgradeConfirm } from "plugins/lime-plugin-firmware/src/firmwareApi";
import { SelectedMapFeature } from "plugins/lime-plugin-mesh-wide/src/mesWideTypes";
import { getRadioData } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

import queryCache from "utils/queryCache";

// todo(kon): this is a mock
export function useMeshWide(params: UseQueryOptions) {
    return useQuery(["lime-meshwide", "get_mesh_info"], getRadioData, {
        ...params,
    });
}

/**
 * This query is used to store the selected feature on the map.
 *
 * Used to store the state between components.
 */
export const useSelectedMapFeature = () => {
    const { data: selectedMapFeature } = useQuery<SelectedMapFeature | null>(
        ["lime-meshwide", "select_map_feature"],
        () => null
    );
    const setSelectedMapFeature = (selected: SelectedMapFeature) =>
        queryCache.setQueryData(
            ["lime-meshwide", "select_map_feature"],
            selected
        );
    return { selectedMapFeature, setSelectedMapFeature };
};
