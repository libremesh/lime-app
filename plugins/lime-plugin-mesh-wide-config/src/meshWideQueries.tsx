import { useQuery } from "@tanstack/react-query";

import { getMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";
import { IMeshWideConfig } from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

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
