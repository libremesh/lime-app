import { NodeMeshUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { meshUpgradeApiCall } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";

import { ParallelMutationError } from "utils/meshWideSyncCall";
import { login } from "utils/queries";
import api, { UhttpdService } from "utils/uhttpd.service";

export const getMeshWideUpgradeInfo = async () => {
    return api.call("shared-state", "getFromSharedState", {
        data_type: "mesh_wide_upgrade",
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

// Remote API calls

export async function remoteStartSafeUpgrade({ ip }: { ip: string }) {
    const customApi = new UhttpdService(ip);
    try {
        await login({ username: "lime-app", password: "generic", customApi });
    } catch (error) {
        throw new ParallelMutationError(`Cannot login for ${ip}`, ip, error);
    }
    try {
        // return await meshUpgradeApiCall("start_safe_upgrade");
        return (await customApi.call(
            "lime-utils",
            "get_node_status",
            {}
        )) as NodeMeshUpgradeInfo;
    } catch (error) {
        throw new ParallelMutationError(
            `Cannot startSafeUpgrade for ${ip}`,
            ip,
            error
        );
    }
}
