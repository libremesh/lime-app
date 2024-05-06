import { QueryKey } from "@tanstack/react-query";

interface MeshUpgradeQueryKeysProps {
    [key: string]: QueryKey;
}

const MeshUpgradeQueryKeys: MeshUpgradeQueryKeysProps = {
    meshWideUpgradeInfo: ["shared-state-async", "get", "mesh_wide_upgrade"],
    getMeshUpgradeNodeStatus: ["lime-mesh-upgrade", "get_node_status"],
    remoteScheduleUpgrade: ["lime-mesh-upgrade", "schedule_upgrade"],
    remoteConfirmUpgrade: ["lime-mesh-upgrade", "confirm_boot_partition"],
};

export const meshUpgradeQueryKeys = {
    getMeshWideUpgradeInfo: (): QueryKey =>
        MeshUpgradeQueryKeys.meshWideUpgradeInfo,
    getMeshUpgradeNodeStatus: (): QueryKey =>
        MeshUpgradeQueryKeys.getMeshUpgradeNodeStatus,
    remoteScheduleUpgrade: (): QueryKey =>
        MeshUpgradeQueryKeys.remoteScheduleUpgrade,
    remoteConfirmUpgrade: (): QueryKey =>
        MeshUpgradeQueryKeys.remoteConfirmUpgrade,
};
