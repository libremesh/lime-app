import { Trans } from "@lingui/macro";
import { useMemo } from "react";

import { IStatusAndButton } from "components/status/statusAndButton";

import {
    useConfirmModal,
    useScheduleUpgradeModal,
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
    someNodeAreDownloading: boolean
): StepperState => {
    if (!nodeInfo || !thisNode) return "INITIAL";

    if (downloadStatus === "download-failed") {
        return "ERROR";
    }

    if (thisNode.upgrade_state === "DEFAULT") {
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

export type ShowFooterStepperState = Extract<
    StepperState,
    | "UPDATE_AVAILABLE"
    | "DOWNLOADED_MAIN"
    | "TRANSACTION_STARTED"
    | "UPGRADE_SCHEDULED"
    | "CONFIRMATION_PENDING"
    | "ERROR"
>;

export function isShowFooterStepperState(
    value: string
): value is ShowFooterStepperState {
    return [
        "UPDATE_AVAILABLE",
        "DOWNLOADED_MAIN",
        "TRANSACTION_STARTED",
        "UPGRADE_SCHEDULED",
        "CONFIRMATION_PENDING",
        "ERROR",
    ].includes(value);
}

export const useStep = () => {
    const {
        stepperState,
        becomeMainNode,
        startFwUpgradeTransaction,
        allNodesReadyForUpgrade,
        allNodesConfirmed,
    } = useMeshUpgrade();

    const { callMutations: startScheduleMeshUpgrade, errors: scheduleErrors } =
        useParallelScheduleUpgrade();

    const { callMutations: confirmMeshUpgrade, errors: confirmErrors } =
        useParallelConfirmUpgrade();

    const { showModal: showScheduleModal } = useScheduleUpgradeModal({
        allNodesReady: allNodesReadyForUpgrade,
        cb: () => {
            startScheduleMeshUpgrade();
        },
    });

    const { showModal: showConfirmationModal } = useConfirmModal({
        // allNodesReady: allNodesConfirmed, // todo(kon) esto no esta bien, aqui deberia comprobar si todos los nodos estan up
        allNodesReady: true,
        cb: () => {
            console.log("SHIIIT");
            confirmMeshUpgrade();
        },
    });

    const showFooter = isShowFooterStepperState(stepperState);

    const step: IStatusAndButton | null = useMemo(() => {
        if (!showFooter) return null;
        switch (stepperState as ShowFooterStepperState) {
            case "UPDATE_AVAILABLE":
                return {
                    status: "success",
                    onClick: () => becomeMainNode(),
                    children: (
                        <Trans>
                            Download remote firmware
                            <br />
                            to start mesh upgrade
                        </Trans>
                    ),
                    btn: <Trans>Start mesh upgrade</Trans>,
                };
            case "DOWNLOADED_MAIN":
                return {
                    status: "success",
                    onClick: startFwUpgradeTransaction,
                    children: <Trans>Ready to start mesh wide upgrade</Trans>,
                    btn: <Trans>Start</Trans>,
                };
            case "TRANSACTION_STARTED":
                return {
                    status: allNodesReadyForUpgrade ? "success" : "warning",
                    onClick: () => {
                        showScheduleModal();
                    },
                    children: allNodesReadyForUpgrade ? (
                        <Trans>Ready to start mesh wide upgrade</Trans>
                    ) : (
                        <Trans>
                            Some nodes are not ready for upgrade <br />
                            Check node details for more info
                        </Trans>
                    ),
                    btn: <Trans>Schedule upgrade</Trans>,
                };
            case "UPGRADE_SCHEDULED": {
                const data: Omit<IStatusAndButton, "status" | "children"> = {
                    onClick: showScheduleModal,
                    btn: <Trans>Schedule again</Trans>,
                };
                if (scheduleErrors?.length) {
                    return {
                        ...data,
                        status: "warning",
                        children: <Trans>Some nodes have errors</Trans>,
                    };
                }
                return {
                    ...data,
                    status: "success",
                    children: <Trans>All nodes scheduled successful</Trans>,
                };
            }
            case "CONFIRMATION_PENDING":
                return {
                    status: "success",
                    onClick: showConfirmationModal,
                    children: <Trans>Confirm upgrade on all nodes</Trans>,
                    btn: <Trans>Confirm</Trans>,
                };
            case "ERROR":
            default:
                return {
                    status: "warning",
                    onClick: () => {}, // todo(kon)
                    children: <Trans>Try last step again</Trans>,
                    btn: <Trans>Try again</Trans>,
                };
        }
    }, [
        allNodesReadyForUpgrade,
        becomeMainNode,
        scheduleErrors?.length,
        showConfirmationModal,
        showFooter,
        showScheduleModal,
        startFwUpgradeTransaction,
        stepperState,
    ]);

    return { step, showFooter };
};
