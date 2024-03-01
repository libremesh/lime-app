import { Trans } from "@lingui/macro";
import { useMemo } from "react";

import { IStatusAndButton } from "components/status/statusAndButton";

import { useScheduleUpgradeModal } from "plugins/lime-plugin-mesh-wide-upgrade/src/components/modals";
import { useMeshUpgrade } from "plugins/lime-plugin-mesh-wide-upgrade/src/hooks/meshWideUpgradeProvider";
import {
    UseScheduleMeshSafeUpgradeType,
    useScheduleMeshSafeUpgrade,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeQueries";
import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
    StepperState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

export const getStepperStatus = (
    nodeInfo: MeshWideUpgradeInfo | undefined,
    thisNode: NodeMeshUpgradeInfo | undefined,
    newVersionAvailable: boolean,
    downloadStatus: string | undefined,
    scheduleMeshSafeUpgradeStatus: UseScheduleMeshSafeUpgradeType | undefined
): StepperState => {
    if (!nodeInfo || !thisNode) return "INITIAL";

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
        thisNode.main_node === "MAIN_NODE" ||
        thisNode.upgrade_state === "DOWNLOADING" ||
        thisNode.upgrade_state === "UPGRADE_SCHEDULED"
    ) {
        if (scheduleMeshSafeUpgradeStatus.isLoading) {
            return "SENDING_START_SCHEDULE";
        }
        if (
            scheduleMeshSafeUpgradeStatus.results.length ||
            scheduleMeshSafeUpgradeStatus.errors.length
        ) {
            return "UPGRADE_SCHEDULED";
        }
        return "TRANSACTION_STARTED";
    }
    if (
        thisNode.upgrade_state === "CONFIRMATION_PENDING" ||
        thisNode.upgrade_state === "CONFIRMED"
    ) {
        return thisNode.upgrade_state;
    }
    return "ERROR";
};

export type ShowFooterStepperState = Extract<
    StepperState,
    | "UPDATE_AVAILABLE"
    | "DOWNLOADED_MAIN"
    | "TRANSACTION_STARTED"
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
        "CONFIRMATION_PENDING",
        "ERROR",
    ].includes(value);
}

export const useStep = () => {
    const {
        stepperState,
        becomeMainNode,
        startFwUpgradeTransaction,
        allNodesReadyForUpgrade: allNodesReady,
    } = useMeshUpgrade();

    const { callMutations: startScheduleMeshUpgrade } =
        useScheduleMeshSafeUpgrade();

    const { showScheduleModal } = useScheduleUpgradeModal({
        allNodesReady,
        cb: () => {
            startScheduleMeshUpgrade();
        },
    });

    const showFooter = isShowFooterStepperState(stepperState);

    const step: IStatusAndButton | null = useMemo(() => {
        if (!showFooter) return null;
        switch (status as ShowFooterStepperState) {
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
                    status: allNodesReady ? "success" : "warning",
                    onClick: () => {
                        showScheduleModal();
                    },
                    children: allNodesReady ? (
                        <Trans>Ready to start mesh wide upgrade</Trans>
                    ) : (
                        <Trans>
                            Some nodes are not ready for upgrade <br />
                            Check node details for more info
                        </Trans>
                    ),
                    btn: <Trans>Schedule upgrade</Trans>,
                };
            case "CONFIRMATION_PENDING":
                return {
                    status: "success",
                    onClick: () => {},
                    children: (
                        <Trans>
                            All nodes upgraded,
                            <br />
                            awaiting confirmation
                        </Trans>
                    ),
                    btn: <Trans>Confirm</Trans>,
                };
            case "ERROR":
            default:
                return {
                    status: "warning",
                    onClick: () => {},
                    children: <Trans>Try last step again</Trans>,
                    btn: <Trans>Try again</Trans>,
                };
        }
    }, [
        allNodesReady,
        becomeMainNode,
        showFooter,
        showScheduleModal,
        startFwUpgradeTransaction,
    ]);

    return { step, showFooter };
};
