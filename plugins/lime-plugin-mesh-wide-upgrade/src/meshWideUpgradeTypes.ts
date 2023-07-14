type InfoStatusType =
    | "UPDATED"
    | "UPGRADE_AVAILABLE"
    | "DOWNLOADING"
    | "UPGRADE_READY"
    | "UPGRADE_SCHEDULED";

export interface UpgradeInfo {
    state: InfoStatusType;
    new_version_info: string;
    safe_upgrade: boolean;
    downloaded: boolean;
    downloading: boolean;
    firmware_check: boolean;
    scheduled: number;
}

export interface UpgradeNodesInfo {
    result: {
        [key: string]: UpgradeInfo;
    };
}
