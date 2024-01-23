import { useMutation, useQuery } from "@tanstack/react-query";

import {
    getMeshWideUpgradeInfo,
    setBecomeMainNode,
    setUpLocalRepository,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeApi";
import { UpgradeNodesInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

export function useMeshWideUpgradeInfo(params) {
    return useQuery<UpgradeNodesInfo>(
        ["lime-meshwideupgrade", "get_upgrade_info"],
        getMeshWideUpgradeInfo,
        {
            ...params,
        }
    );
}

export function useSetUpLocalRepository(params) {
    return useMutation<unknown, unknown, unknown>({
        mutationFn: setUpLocalRepository,
        ...params,
    });
}

export function useSetBecomeMainNode(params) {
    return useMutation<unknown, unknown, unknown>({
        mutationFn: setBecomeMainNode,
        ...params,
    });
}
