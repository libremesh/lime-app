import {
    MeshWideRPCReturnTypes,
    NodeMeshUpgradeInfo,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshWideUpgradeTypes";

import api from "utils/uhttpd.service";

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

const _meshUpgradeApiCall = async (method: string) => {
    const res = (await api.call(
        "lime-mesh-upgrade",
        method,
        {}
    )) as MeshWideRPCReturnTypes;
    if (res.error) {
        // todo(kon): handle errors with error code or whatever
        throw new Error(res.error);
    }
    return res.code;
};

export const setBecomeMainNode = async () => {
    return (await _meshUpgradeApiCall("become_main_node")) as string;
};

export const setStartFirmwareUpgradeTransaction = async () => {
    return await _meshUpgradeApiCall("start_firmware_upgrade_transaction");
};
