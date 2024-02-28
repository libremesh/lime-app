import {
    MeshWideUpgradeInfo,
    NodeMeshUpgradeInfo,
    StepperState,
} from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

export const getStepperStatus = (
    nodeInfo: MeshWideUpgradeInfo | undefined,
    thisNode: NodeMeshUpgradeInfo | undefined,
    newVersionAvailable: boolean,
    downloadStatus: string | undefined
): StepperState => {
    if (!nodeInfo || !thisNode) return "INITIAL";
    if (thisNode.upgrade_state === "DEFAULT") {
        if (newVersionAvailable) return "UPDATE_AVAILABLE";
        return "NO_UPDATE";
    }
    if (thisNode.main_node === "STARTING") {
        if (downloadStatus === "downloading") {
            return "DOWNLOADING_MAIN";
        } else if (downloadStatus === "downloaded") {
            return "DOWNLOADED_MAIN";
        }
    }
    if (thisNode.main_node === "MAIN_NODE") {
        return "TRANSACTION_STARTED";
    }
    // todo(kon): check if the main node will follow the same logic as the other nodes
    if (thisNode.upgrade_state === "DOWNLOADING") {
        return "TRANSACTION_STARTED";
    }
    if (
        thisNode.upgrade_state === "UPGRADE_SCHEDULED" ||
        thisNode.upgrade_state === "CONFIRMATION_PENDING" ||
        thisNode.upgrade_state === "ERROR" ||
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
