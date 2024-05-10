import {
    DataTypeMap,
    DataTypes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const getFromSharedStateMultiWriterKey = [
    "shared-state",
    "getFromSharedStateMultiWriter",
];
export const getFromSharedStateAsyncKey = ["shared-state-async", "get"];
export const syncFromSharedStateAsyncKey = ["shared-state-async", "sync"];

export const insertIntoSharedStateKey = [
    "shared-state",
    "insertIntoSharedStateMultiWriter",
];

export const getFromSharedStateKeys = {
    getFromSharedStateAsync: (dataType: DataTypes) => [
        ...getFromSharedStateAsyncKey,
        { data_type: dataType },
    ],
    syncFromSharedStateAsync: <T extends DataTypes>(
        dataType: T,
        ip: string
    ) => [...syncFromSharedStateAsyncKey, { data_type: dataType, ip }],
    getFromSharedStateMultiWriter: (dataType: DataTypes) => [
        ...getFromSharedStateMultiWriterKey,
        { data_type: dataType },
    ],
    insertIntoSharedStateKey: <T extends DataTypes>(
        dataType: T,
        data: DataTypeMap[T]
    ) => [...insertIntoSharedStateKey, { data_type: dataType, json: data }],
};
