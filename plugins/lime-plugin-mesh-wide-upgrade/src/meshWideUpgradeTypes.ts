import { EupgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/eupgrade";

export type MainNodeStatusType = "NO" | "STARTING" | "MAIN_NODE";

export type UpgradeStatusType =
    | "DEFAULT" // No transaction
    | "STARTING" // Download firmware to setup as master node
    | "DOWNLOADING" // Transaction started
    | "READY_FOR_UPGRADE"
    | "UPGRADE_SCHEDULED"
    | "CONFIRMATION_PENDING"
    | "CONFIRMED"
    | "ERROR";

// Inner state to check the stepper state. It differs from the upgradeStatusType
// because is an inner state for the ui used on the main node, and is calculated
// on the ui side.
export type StepperState =
    | "INITIAL" // No transaction
    | "NO_UPDATE" // No update available
    | "UPDATE_AVAILABLE" // New version available
    | "DOWNLOADING_MAIN" // Downloading firmware to setup as master node
    | "DOWNLOADED_MAIN" // Downloaded firmware to setup as master node
    | "TRANSACTION_STARTED" // Transaction initiated and sharing new firmware
    | "READY_FOR_UPGRADE" // Nodes are ready for upgrade
    | "UPGRADE_SCHEDULED" // Upgrade scheduled
    | "CONFIRMATION_PENDING" // Upgrade done, confirmation pending.
    | "CONFIRMED" // Upgrade done, confirmed.
    | "ERROR"; // Error

/**
 * Interface that describe the result for this node mesh upgrade status
 */
export interface NodeMeshUpgradeInfo {
    timestamp: string;
    main_node: MainNodeStatusType;
    error: string;
    transaction_state: string;
    upgrade_state: UpgradeStatusType;
    eupgradestate: EupgradeStatus;
    repo_url?: string;
    candidate_fw?: string;
    board_name: string;
    current_fw: string;
}

export type MeshWideNodeUpgradeInfo = {
    bleachTTL: number;
    author: string;
} & NodeMeshUpgradeInfo;

export interface MeshWideUpgradeInfo {
    [key: string]: MeshWideNodeUpgradeInfo;
}

export interface MeshWideRPCReturnTypes {
    code: "SUCCESS" | "ERROR";
    error?: string;
}
