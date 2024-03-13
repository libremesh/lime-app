import { useMutation, useQuery } from "@tanstack/react-query";

import {
    getMeshUpgradeNodeStatus,
    getMeshWideUpgradeInfo,
    remoteConfirmUpgrade,
    remoteScheduleUpgrade,
    setBecomeMainNode,
    setStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeApi";
import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import { getNodeIpsByStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";

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

export type UseScheduleMeshSafeUpgradeType = ReturnType<
    typeof useParallelScheduleUpgrade
>;
export const useParallelScheduleUpgrade = (opts?) => {
    // State to store the errors
    const { data: nodes } = useMeshWideUpgradeInfo({});
    const ips = getNodeIpsByStatus(nodes, "READY_FOR_UPGRADE");
    // localStorage.setItem("hideReleaseBannerPlease", value);
    return useMeshWideSyncCall({
        mutationKey: ["lime-mesh-upgrade", "start_safe_upgrade"],
        mutationFn: remoteScheduleUpgrade,
        ips,
        options: opts,
    });
};

export type UseConfirmUpgradeType = ReturnType<
    typeof useParallelConfirmUpgrade
>;
export const useParallelConfirmUpgrade = (opts?) => {
    // State to store the errors
    const { data: nodes } = useMeshWideUpgradeInfo({});
    const ips = getNodeIpsByStatus(nodes, "READY_FOR_UPGRADE");
    return useMeshWideSyncCall({
        mutationKey: ["lime-mesh-upgrade", "confirm_boot_partition"],
        mutationFn: remoteConfirmUpgrade,
        ips,
        options: opts,
    });
};
