export type ConfigItemType = string | string[];

export interface IMeshWideSection {
    [key: string]: ConfigItemType;
}

export type IMeshWideConfig = {
    [section: string]: IMeshWideSection;
};

export type GetCommunityConfigResponse = {
    file_contents: string;
};

export type MainNodeStatusType = "NO" | "MAIN_NODE";

export type ConfigUpdateState =
    | "DEFAULT" // When no config has changed
    | "READY_FOR_APPLY" //the config is set in the node and is ready to reboot
    | "RESTART_SCHEDULED" // the node will reboot in xx seconds
    | "CONFIRMATION_PENDING" // the node rebooted and the configuration is not confirmed
    | "CONFIRMED" // the configuration has been set and the user was able to confirm the change
    | "ERROR"
    | "ABORTED";

export interface NodeMeshConfigInfo {
    timestamp: string;
    main_node: MainNodeStatusType;
    error: string;
    node_ip: string;
    transaction_state: ConfigUpdateState;
    current_config_hash: string;
    safe_restart_remaining: number;
    retry_count: number;
    safe_restart_start_time_out: number;
    safe_restart_start_mark: number;
    board_name: string;
    safe_restart_confirm_timeout: number;
}

export type MeshWideNodeConfigInfo = {
    bleachTTL: number;
    author: string;
} & NodeMeshConfigInfo;

export interface MeshWideConfigState {
    [key: string]: MeshWideNodeConfigInfo;
}

export type StepperWizardState =
    | "ABORTING"
    | "APPLYING" // the node is applying the configuration
    | "SENDING_START_SCHEDULE"
    | "SENDING_CONFIRMATION"
    | ConfigUpdateState;
