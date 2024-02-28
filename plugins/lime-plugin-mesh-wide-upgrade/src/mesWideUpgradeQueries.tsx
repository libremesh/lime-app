import { useMutation, useQuery } from "@tanstack/react-query";

import {
    getMeshUpgradeNodeStatus,
    getMeshWideUpgradeInfo,
    remoteStartSafeUpgrade,
    setBecomeMainNode,
    setStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeApi";
import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { useMeshWideNodes } from "plugins/lime-plugin-mesh-wide/src/mesWideQueries";

import { useMeshWideSyncCall } from "utils/meshWideSyncCall";

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

// Parallel queries/mutations

export const useStartSafeUpgrade = () => {
    // State to store the errors
    const { data: nodes } = useMeshWideNodes({});
    const ips = Object.values(nodes || {}).map(
        // @ts-ignore
        (node) => node?.ipv4 ?? ""
    );
    return useMeshWideSyncCall(remoteStartSafeUpgrade, ips);
};
