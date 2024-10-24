import { Trans } from "@lingui/macro";
import { useMemo } from "react";

import { useDisclosure } from "components/Modal/useDisclosure";
import { IStatusAndButton } from "components/status/statusAndButton";

import {
    AbortModal,
    ConfirmModal,
    ScheduleUpgradeModal,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/components/modals";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import {
    UseConfirmUpgradeType,
    UseScheduleMeshSafeUpgradeType,
    useParallelConfirmUpgrade,
    useParallelScheduleUpgrade,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";
import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
    StepperState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import { EupgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/eupgrade";

export const getStepperStatus = (
    nodeInfo: MeshWideUpgradeInfo | undefined,
    thisNode: NodeMeshUpgradeInfo | undefined,
    thisNodeError: boolean,
    newVersionAvailable: boolean,
    downloadStatus: EupgradeStatus,
    scheduleMeshSafeUpgradeStatus: UseScheduleMeshSafeUpgradeType | undefined,
    confirmUpgradeStatus: UseConfirmUpgradeType | undefined,
    someNodeAreDownloading: boolean,
    isAborting: boolean
): StepperState => {
    if (!nodeInfo || !thisNode) return "INITIAL";

    if (isAborting) {
        return "ABORTING";
    }

    if (downloadStatus === "download-failed") {
        return "ERROR";
    }

    if (
        thisNode.upgrade_state === "DEFAULT" ||
        thisNode.upgrade_state === "ABORTED"
    ) {
        if (newVersionAvailable) return "UPDATE_AVAILABLE";
        return "NO_UPDATE";
    }

    if (thisNode.main_node === "STARTING") {
        if (downloadStatus === "downloaded") {
            return "DOWNLOADED_MAIN";
        }
        return "DOWNLOADING_MAIN";
    }
    if (
        thisNode.upgrade_state === "READY_FOR_UPGRADE" ||
        thisNode.upgrade_state === "DOWNLOADING" ||
        thisNode.upgrade_state === "UPGRADE_SCHEDULED"
    ) {
        // We suppose that if the upgrade is scheduled, and we lost the connection is because is upgrading
        if (thisNode.upgrade_state === "UPGRADE_SCHEDULED" && thisNodeError) {
            return "UPGRADING";
        }
        if (scheduleMeshSafeUpgradeStatus?.isLoading) {
            return "SENDING_START_SCHEDULE";
        }
        if (someNodeAreDownloading) {
            return "NODES_DOWNLOADING";
        }
        if (
            scheduleMeshSafeUpgradeStatus?.results?.length ||
            scheduleMeshSafeUpgradeStatus?.errors?.length
        ) {
            return "UPGRADE_SCHEDULED";
        }
        // Here the user can send the schedule upgrade to the nodes
        return "TRANSACTION_STARTED";
    }
    if (
        thisNode.upgrade_state === "CONFIRMATION_PENDING" ||
        thisNode.upgrade_state === "CONFIRMED"
    ) {
        if (confirmUpgradeStatus?.isLoading) {
            return "SENDING_CONFIRMATION";
        }
        if (confirmUpgradeStatus?.errors?.length) {
            return "CONFIRMATION_PENDING";
        }
        return thisNode.upgrade_state;
    }
    if (thisNode.upgrade_state === "ERROR") {
        return "ERROR";
    }
    return "INITIAL";
};
