import { QueryKey } from "@tanstack/react-query";

import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";
import { MeshUpgradeTypes } from "components/shared-state/SharedStateTypes";

interface MeshUpgradeQueryKeysProps {
    [key: string]: QueryKey;
}

const MeshUpgradeQueryKeys: MeshUpgradeQueryKeysProps = {
    getMeshUpgradeNodeStatus: ["lime-mesh-upgrade", "get_node_status"],
    remoteScheduleUpgrade: ["lime-mesh-upgrade", "schedule_upgrade"],
    remoteConfirmUpgrade: ["lime-mesh-upgrade", "confirm_boot_partition"],
    remoteAbort: ["lime-mesh-upgrade", "abort"],
};

export const meshUpgradeSharedStateKey: keyof MeshUpgradeTypes =
    "mesh_wide_upgrade";

export const meshUpgradeQueryKeys = {
    getMeshWideUpgradeInfo: (): QueryKey =>
        sharedStateQueries.getFromSharedState(meshUpgradeSharedStateKey),
    getMeshUpgradeNodeStatus: (): QueryKey =>
        MeshUpgradeQueryKeys.getMeshUpgradeNodeStatus,
    remoteScheduleUpgrade: (): QueryKey =>
        MeshUpgradeQueryKeys.remoteScheduleUpgrade,
    remoteConfirmUpgrade: (): QueryKey =>
        MeshUpgradeQueryKeys.remoteConfirmUpgrade,
    remoteAbort: (): QueryKey => MeshUpgradeQueryKeys.remoteConfirmUpgrade,
};
