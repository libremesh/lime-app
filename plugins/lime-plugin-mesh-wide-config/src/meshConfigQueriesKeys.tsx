import { MeshConfigTypes } from "components/shared-state/SharedStateTypes";

export const MeshConfigQueryKeys: {
    [key: string]: [string, string];
} = {
    getNodeStatus: ["lime-mesh-config", "get_node_status"],
    getCommunityConfig: ["lime-mesh-config", "get_community_config"],
    remoteConfirmUpgrade: ["lime-mesh-config", "start_config_transaction"],
    startSafeReboot: ["lime-mesh-config", "start_safe_reboot"],
    confirm: ["lime-mesh-config", "confirm"],
    remoteAbort: ["lime-mesh-config", "abort"],
    setCommunityConfig: ["lime-mesh-config", "start_config_transaction"],
};

export const meshConfigStateKey: keyof MeshConfigTypes = "mesh_config";
