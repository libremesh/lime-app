import { callToRemoteNode } from "components/shared-state/SharedStateApi";
import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";

import { meshUpgradeSharedStateKey } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueriesKeys";
import {
    MeshWideRPCReturnTypes,
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

import { ApiServiceParamsType, standarizedApiCall } from "utils/standarizedApi";
import api, { UhttpdService } from "utils/uhttpd.service";

export const getMeshWideUpgradeInfo = async () => {
    const query = sharedStateQueries.getFromSharedState(
        meshUpgradeSharedStateKey
    );
    return standarizedApiCall<MeshWideUpgradeInfo>({
        args: query as ApiServiceParamsType,
    });
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

export async function remoteAbort({ ip }: { ip: string }) {
    return await callToRemoteNode({
        ip,
        apiCall: (customApi) => meshUpgradeApiCall("abort", customApi),
    });
}

const meshUpgradeApiCall = async (
    method: string,
    customApi?: UhttpdService
) => {
    const httpService = customApi || api;
    return (
        (await standarizedApiCall({
            apiService: httpService,
            args: ["lime-mesh-upgrade", method, {}],
        })) as MeshWideRPCReturnTypes
    ).code;
};
