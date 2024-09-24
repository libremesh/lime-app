import { useQuery } from "@tanstack/react-query";

import { getMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigApi";
import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export function useMeshWideConfig(params) {
    return useQuery<IMeshWideConfig>(
        ["lime-meshwide", "get_mesh_config"],
        getMeshWideConfig,
        {
            ...params,
        }
    );
}
