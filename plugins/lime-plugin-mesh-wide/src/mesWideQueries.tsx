import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query/src/types";

import { getRadioData } from "plugins/lime-plugin-mesh-wide/src/meshWideMocks";

// todo(kon): this is a mock
export function useMeshWide(params: UseQueryOptions) {
    return useQuery(["lime-meshwide", "get_mesh_info"], getRadioData, {
        ...params,
    });
}
