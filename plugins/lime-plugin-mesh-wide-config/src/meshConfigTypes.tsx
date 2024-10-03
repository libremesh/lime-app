export interface IMeshWideSection {
    name: string;
    options: { [key: string]: string };
}

export type MainNodeStatusType = "NO" | "MAIN_NODE";

export type IMeshWideConfig = IMeshWideSection[];

export type ConfigUpdateState =
    | "DEFAULT" // No transaction
    | "READY_FOR_UPGRADE"
    | "UPGRADE_SCHEDULED"
    | "CONFIRMATION_PENDING"
    | "CONFIRMED"
    | "ABORTED"
    | "ERROR";

export interface NodeMeshConfigInfo {
    timestamp: string;
    main_node: MainNodeStatusType;
    error: string;
    node_ip: string;
    state: ConfigUpdateState;
}

export type MeshWideNodeConfigInfo = {
    bleachTTL: number;
    author: string;
} & NodeMeshConfigInfo;

export interface MeshWideConfigState {
    [key: string]: MeshWideNodeConfigInfo;
}
