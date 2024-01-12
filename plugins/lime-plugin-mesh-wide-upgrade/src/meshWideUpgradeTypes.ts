export type UpgradeStatusType =
    | "DEFAULT"
    | "STARTING"
    | "DOWNLOADING"
    | "READY_FOR_UPGRADE"
    | "UPGRADE_SCHEDULED"
    | "CONFIRMATION_PENDING"
    | "CONFIRMED"
    | "ERROR";

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
