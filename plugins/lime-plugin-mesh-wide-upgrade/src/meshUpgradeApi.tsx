import { NodeMeshUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import {
    MeshUpgradeApiError,
    meshUpgradeApiCall,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";

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

async function remoteCallWrapper({
    ip,
    apiMethod,
}: {
    ip: string;
    apiMethod: string;
}) {
    const customApi = new UhttpdService(ip);
    try {
        await login({ username: "lime-app", password: "generic", customApi });
    } catch (error) {
        throw new ParallelMutationError(
            `Cannot login`,
            customApi.customIp,
            error
        );
    }
    try {
        return await meshUpgradeApiCall(apiMethod, customApi);
    } catch (error) {
        let additionalInfo = "";
        if (error instanceof MeshUpgradeApiError) {
            additionalInfo = `: ${error.message}`;
        }
        throw new ParallelMutationError(
            `Cannot startSafeUpgrade${additionalInfo}`,
            ip,
            error
        );
    }
}

export async function remoteScheduleUpgrade({ ip }: { ip: string }) {
    return await remoteCallWrapper({ ip, apiMethod: "start_safe_upgrade" });
}

export async function remoteConfirmUpgrade({ ip }: { ip: string }) {
    return await remoteCallWrapper({ ip, apiMethod: "confirm_boot_partition" });
}
