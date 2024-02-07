import { useMutation, useQuery } from "@tanstack/react-query";

import {
    getMeshUpgradeNodeStatus,
    getMeshWideUpgradeInfo,
    setBecomeMainNode,
    setStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeApi";
import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

export const meshUpgradeNodeStatusKey = [
    "lime-mesh-upgrade",
    "get_node_status",
];

// Shared state related queries

export function useMeshWideUpgradeInfo(params) {
    return useQuery<MeshWideUpgradeInfo>(
        ["shared-state", "getFromSharedState", "mesh_wide_upgrade"],
        getMeshWideUpgradeInfo,
        {
            ...params,
        }
    );
}

// Synchronous queries/mutations

export function useMeshUpgradeNodeStatus(params) {
    return useQuery<NodeMeshUpgradeInfo>(
        meshUpgradeNodeStatusKey,
        getMeshUpgradeNodeStatus,
        {
            ...params,
        }
    );
}

export function useBecomeMainNode(params) {
    return useMutation<unknown, unknown, unknown>({
        mutationFn: setBecomeMainNode,
        ...params,
    });
}

export function useStartFirmwareUpgradeTransaction(params) {
    return useMutation<unknown, unknown, unknown>({
        mutationFn: setStartFirmwareUpgradeTransaction,
        ...params,
    });
}
