import { MeshWideRPCReturnTypes } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";
import { EupgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/eupgrade";

import api from "utils/uhttpd.service";

const _meshUpgradeApiCall = async (method: string) => {
    const res = (await api.call(
        "lime-mesh-upgrade",
        method
    )) as MeshWideRPCReturnTypes;
    if (res.error) {
        // todo(kon): handle errors with error code or whatever
        throw new Error(res.error);
    }
    return res.code;
};

export const getMeshWideUpgradeInfo = async () => {
    return api.call("shared-state", "getFromSharedState", {
        data_type: "mesh_wide_upgrade",
    });
};

export const setBecomeMainNode = async () => {
    return await _meshUpgradeApiCall("become_main_node");
};

export const getMainNodeStatus = async () => {
    return (await _meshUpgradeApiCall(
        "get_main_node_status"
    )) as EupgradeStatus;
};

export const setStartFirmwareUpgradeTransaction = async () => {
    return await _meshUpgradeApiCall("start_firmware_upgrade_transaction");
};
