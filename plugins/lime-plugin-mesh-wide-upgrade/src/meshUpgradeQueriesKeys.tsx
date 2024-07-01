import { QueryKey } from "@tanstack/react-query";

import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";

interface MeshUpgradeQueryKeysProps {
    [key: string]: QueryKey;
}

const MeshUpgradeQueryKeys: MeshUpgradeQueryKeysProps = {
    getMeshUpgradeNodeStatus: ["lime-mesh-upgrade", "get_node_status"],
    remoteScheduleUpgrade: ["lime-mesh-upgrade", "schedule_upgrade"],
    remoteConfirmUpgrade: ["lime-mesh-upgrade", "confirm_boot_partition"],
    remoteAbort: ["lime-mesh-upgrade", "abort"],
};

export const meshUpgradeQueryKeys = {
    getMeshWideUpgradeInfo: (): QueryKey =>
        sharedStateQueries.getFromSharedState("mesh_wide_upgrade"),
    getMeshUpgradeNodeStatus: (): QueryKey =>
        MeshUpgradeQueryKeys.getMeshUpgradeNodeStatus,
    remoteScheduleUpgrade: (): QueryKey =>
        MeshUpgradeQueryKeys.remoteScheduleUpgrade,
    remoteConfirmUpgrade: (): QueryKey =>
        MeshUpgradeQueryKeys.remoteConfirmUpgrade,
    remoteAbort: (): QueryKey => MeshUpgradeQueryKeys.remoteConfirmUpgrade,
};
