import { useMutation, useQuery } from "@tanstack/react-query";

import {
    getMainNodeStatus,
    getMeshWideUpgradeInfo,
    setBecomeMainNode,
    setStartFirmwareUpgradeTransaction,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeApi";
import { UpgradeNodesInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { EupgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/eupgrade";

export function useMeshWideUpgradeInfo(params) {
    return useQuery<UpgradeNodesInfo>(
        ["lime-meshwideupgrade", "get_upgrade_info"],
        getMeshWideUpgradeInfo,
        {
            ...params,
        }
    );
}

export function useSetBecomeMainNode(params) {
    return useMutation<unknown, unknown, unknown>({
        mutationFn: setBecomeMainNode,
        ...params,
    });
}

export function useMainNodeStatus(params) {
    return useQuery<EupgradeStatus>(
        ["lime-meshwideupgrade", "get_main_node_status"],
        getMainNodeStatus,
        {
            ...params,
        }
    );
}

export function useStartFirmwareUpgradeTransaction(params) {
    return useMutation<unknown, unknown, unknown>({
        mutationFn: setStartFirmwareUpgradeTransaction,
        ...params,
    });
}
