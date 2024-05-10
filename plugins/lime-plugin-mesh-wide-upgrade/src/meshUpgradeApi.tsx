import {
    MeshWideRPCReturnTypes,
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import {
    MeshUpgradeApiError,
    callToRemoteNode,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";

import api, { UhttpdService } from "utils/uhttpd.service";

export const getMeshWideUpgradeInfo = async () => {
    const res = await api.call("shared-state-async", "get", {
        data_type: "mesh_wide_upgrade",
    });
    if (res.error) {
        throw new Error(
            `Error getting mesh wide upgrade info from shared state async, code error ${res.error}`
        );
    }
    return res.data as MeshWideUpgradeInfo;
};

export const getMeshUpgradeNodeStatus = async () => {
    return (await api.call(
        "lime-mesh-upgrade",
        "get_node_status",
        {}
    )) as NodeMeshUpgradeInfo;
};

export const setBecomeMainNode = async () => {
    return (await meshUpgradeApiCall("become_main_node")) as string;
};

export const setStartFirmwareUpgradeTransaction = async () => {
    return await meshUpgradeApiCall("start_firmware_upgrade_transaction");
};

export const setAbort = async () => {
    return await meshUpgradeApiCall("abort");
};

// Remote API calls
export async function remoteScheduleUpgrade({ ip }: { ip: string }) {
    return await callToRemoteNode({
        ip,
        apiCall: (customApi) =>
            meshUpgradeApiCall("start_safe_upgrade", customApi),
    });
}

export async function remoteConfirmUpgrade({ ip }: { ip: string }) {
    return await callToRemoteNode({
        ip,
        apiCall: (customApi) =>
            meshUpgradeApiCall("confirm_boot_partition", customApi),
    });
}

const meshUpgradeApiCall = async (
    method: string,
    customApi?: UhttpdService
) => {
    const httpService = customApi || api;
    const res = (await httpService.call(
        "lime-mesh-upgrade",
        method,
        {}
    )) as MeshWideRPCReturnTypes;
    if (res.error) {
        throw new MeshUpgradeApiError(res.error, res.code);
    }
    return res.code;
};
