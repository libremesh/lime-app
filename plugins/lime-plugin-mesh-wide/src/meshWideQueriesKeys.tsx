import {
    DataTypeMap,
    DataTypes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const getFromSharedStateKey = ["shared-state-async", "get"];
export const insertIntoSharedStateKey = ["shared-state-async", "insert"];
export const syncFromSharedStateKey = ["shared-state-async", "sync"];
export const publishAllFromSharedStateKey = [
    "shared-state-async",
    "publish_all",
];

export const getFromSharedStateKeys = {
    getFromSharedState: (dataType: DataTypes) => [
        ...getFromSharedStateKey,
        { data_type: dataType },
    ],
    getReferenceFromSharedState: (dataType: DataTypes) => [
        ...getFromSharedStateKey,
        { data_type: `${dataType}_ref` },
    ],
    syncFromSharedState: <T extends DataTypes>(
        dataType: T,
        peers_ip: string[]
    ) => [...syncFromSharedStateKey, { data_type: dataType, peers_ip }],
    insertIntoReferenceState: <T extends DataTypes>(
        dataType: T,
        data: DataTypeMap[T]
    ) => [
        ...insertIntoSharedStateKey,
        { data_type: `${dataType}_ref`, json: data },
    ],
    publishAllFromSharedState: () => [...publishAllFromSharedStateKey, {}],
};
