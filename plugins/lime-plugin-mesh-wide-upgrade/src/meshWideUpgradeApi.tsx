import api from "utils/uhttpd.service";

export const getMeshWideUpgradeInfo = async () => {
    return api.call("shared-state", "getFromSharedState", {
        data_type: "mesh_wide_upgrade",
    });
};

export const setUpLocalRepository = async () => {
    return api.call("lime-mesh-upgrade", "set_up_local_repository");
};

export const setBecomeMainNode = async () => {
    return api.call("lime-mesh-upgrade", "become_main_node");
};
