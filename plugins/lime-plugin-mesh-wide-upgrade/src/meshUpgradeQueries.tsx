import { useMutation, useQuery } from "@tanstack/react-query";

import {
    getMeshUpgradeNodeStatus,
    getMeshWideUpgradeInfo,
    remoteAbort,
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
import { getNodeIpsByCondition } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";

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
    const ips = getNodeIpsByCondition(
        nodes,
        (node) => node.upgrade_state === "READY_FOR_UPGRADE"
    );
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
    const ips = getNodeIpsByCondition(
        nodes,
        (node) => node.upgrade_state === "CONFIRMATION_PENDING"
    );
    return useMeshWideSyncCall({
        mutationKey: meshUpgradeQueryKeys.remoteConfirmUpgrade(),
        mutationFn: remoteConfirmUpgrade,
        ips,
        options: opts,
    });
};

export const useParallelAbort = (opts?) => {
    // State to store the errors
    const { data: nodes } = useMeshWideUpgradeInfo({});
    const ips = getNodeIpsByCondition(nodes, (node) =>
        [
            "READY_FOR_UPGRADE",
            "UPGRADE_SCHEDULED",
            "CONFIRMATION_PENDING",
            "ERROR",
        ].includes(node.upgrade_state)
    );
    return useMeshWideSyncCall({
        mutationKey: meshUpgradeQueryKeys.remoteAbort(),
        mutationFn: remoteAbort,
        ips,
        options: opts,
    });
};
