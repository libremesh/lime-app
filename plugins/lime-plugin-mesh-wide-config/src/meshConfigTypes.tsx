import { MeshConfigTypes } from "components/shared-state/SharedStateTypes";

export interface IMeshWideSection {
    name: string;
    options: { [key: string]: string };
}

export type MainNodeStatusType = "NO" | "MAIN_NODE";

export type IMeshWideConfig = IMeshWideSection[];

export type ConfigUpdateState =
    | "DEFAULT"
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

export const meshConfigStateKey: keyof MeshConfigTypes = "mesh_wide_config";

export type StepperState =
    | "INITIAL" // No transaction
    | "TRANSACTION_STARTED" // Transaction initiated and sharing new configuration
    | "SENDING_START_SCHEDULE" // Sending start to start the safe_reboot
    | "UPGRADE_SCHEDULED" // Upgrade scheduled
    | "UPGRADING" // Doing the upgrade
    | "CONFIRMATION_PENDING" // Upgrade done, confirmation pending.
    | "SENDING_CONFIRMATION" // Sending confirmation to confirm the upgrade
    | "CONFIRMED" // Upgrade done, confirmed.
    | "ERROR" // Error
    | "ABORTING"; // Aborting
