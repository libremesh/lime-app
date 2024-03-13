import { useMutation, useQuery } from "@tanstack/react-query";

import {
    getMeshUpgradeNodeStatus,
    getMeshWideUpgradeInfo,
    remoteConfirmUpgrade,
    remoteScheduleUpgrade,
    setBecomeMainNode,
    setStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeApi";
import { meshUpgradeQueryKeys } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueriesKeys";
import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import { getNodeIpsByStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";

import { useMeshWideSyncCall } from "utils/meshWideSyncCall";

// Shared state related queries

export function useMeshWideUpgradeInfo(params) {
    return useQuery<MeshWideUpgradeInfo>(
        meshUpgradeQueryKeys.getMeshWideUpgradeInfo(),
        getMeshWideUpgradeInfo,
        {
            ...params,
        }
    );
}

// Synchronous queries/mutations

export function useMeshUpgradeNodeStatus(params) {
    return useQuery<NodeMeshUpgradeInfo>(
        meshUpgradeQueryKeys.getMeshUpgradeNodeStatus(),
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
        mutationKey: meshUpgradeQueryKeys.remoteScheduleUpgrade(),
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
        mutationKey: meshUpgradeQueryKeys.remoteConfirmUpgrade(),
        mutationFn: remoteConfirmUpgrade,
        ips,
        options: opts,
    });
};
