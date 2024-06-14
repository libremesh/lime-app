import { MeshWideUpgradeInfo } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";
import {
    IBatmanLinks,
    INodes,
    IWifiLinks,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export type MeshUpgradeTypes = {
    mesh_wide_upgrade: MeshWideUpgradeInfo;
};

export type MeshWideMapTypes = {
    node_info: INodes;
    wifi_links_info: IWifiLinks;
    bat_links_info: IBatmanLinks;
};

// Reference state types
type AppendRef<T> = {
    [K in keyof T as `${string & K}_ref`]: T[K];
};
export type MeshWideMapReferenceTypes = AppendRef<MeshWideMapTypes>;

export type AllSharedStateTypes = MeshWideMapTypes &
    MeshUpgradeTypes &
    MeshWideMapReferenceTypes;

export type SharedStateDataTypeKeys = keyof AllSharedStateTypes;

export type SharedStateDataTypes =
    AllSharedStateTypes[keyof AllSharedStateTypes];
export type SharedStateReturnType<T extends SharedStateDataTypes> = {
    data: T;
    error: number;
};

// Query keys
export const getFromSharedStateKey = ["shared-state-async", "get"];
export const insertIntoSharedStateKey = ["shared-state-async", "insert"];
export const syncFromSharedStateKey = ["shared-state-async", "sync"];
export const publishAllFromSharedStateKey = [
    "shared-state-async",
    "publish_all",
];

/**
 * Use this constant to get the query keys to be used as api call parameters.
 */
export const sharedStateQueries = {
    getFromSharedState: (dataType: SharedStateDataTypeKeys) => [
        ...getFromSharedStateKey,
        { data_type: dataType },
    ],
    syncFromSharedState: <T extends SharedStateDataTypeKeys>(
        dataType: T,
        peers_ip: string[]
    ) => [...syncFromSharedStateKey, { data_type: dataType, peers_ip }],
    insertIntoReferenceState: <T extends SharedStateDataTypeKeys>(
        dataType: T,
        data: AllSharedStateTypes[T]
    ) => [
        ...insertIntoSharedStateKey,
        { data_type: `${dataType}_ref`, json: data },
    ],
    publishAllFromSharedState: () => [...publishAllFromSharedStateKey, {}],
};
