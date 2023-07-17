export type InfoStatusType =
    | "UPDATED"
    | "UPGRADE_AVAILABLE"
    | "DOWNLOADING"
    | "UPGRADE_READY"
    | "UPGRADE_SCHEDULED";

export interface UpgradeInfo {
    state: InfoStatusType;
    new_version_info: string;
    safe_upgrade: boolean;
    downloaded: boolean; // todo(kon): not needed, it can be known by the state
    downloading: boolean; // todo(kon): this could be the percentatge?
    firmware_check: boolean; // todo(kon): not needed, it can be known by the state
    scheduled: number;
}

export interface UpgradeNodesInfo {
    result: {
        [key: string]: UpgradeInfo;
    };
}
