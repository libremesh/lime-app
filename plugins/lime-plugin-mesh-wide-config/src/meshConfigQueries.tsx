import { useQuery } from "@tanstack/react-query";

import {
    getMeshWideConfig,
    getMeshWideConfigState,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigApi";
import {
    IMeshWideConfig,
    MeshWideConfigState,
} from "plugins/lime-plugin-mesh-wide-config/src/meshConfigTypes";

export function useMeshWideConfig(params) {
    return useQuery<IMeshWideConfig>(
        ["lime-mesh-config", "get_mesh_config"],
        getMeshWideConfig,
        {
            ...params,
        }
    );
}

export function useMeshWideConfigState(params) {
    return useQuery<MeshWideConfigState>(
        ["lime-mesh-config", "get_mesh_config_state"],
        getMeshWideConfigState,
        {
            ...params,
        }
    );
}
