import { EupgradeStatus } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/eupgrade";

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

export interface UpgradeInfo {
    bleachTTL: number;
    author: string;
    candidate_fw?: string;
    repo_url?: string;
    upgrade_state: UpgradeStatusType;
    error: string;
    master_node: boolean;
    board_name: string;
    current_fw: string;
}

export interface UpgradeNodesInfo {
    [key: string]: UpgradeInfo;
}

export interface MeshWideRPCReturnTypes {
    code: EupgradeStatus | string;
    error?: string;
}
