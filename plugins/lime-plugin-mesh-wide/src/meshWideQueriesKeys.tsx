import {
    DataTypeMap,
    DataTypes,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

export const getFromSharedStateMultiWriterKey = [
    "shared-state",
    "getFromSharedStateMultiWriter",
];
export const getFromSharedStateAsyncKey = ["shared-state-async", "get"];

export const insertIntoSharedStateKey = [
    "shared-state",
    "insertIntoSharedStateMultiWriter",
];

export const getFromSharedStateKeys = {
    getFromSharedStateAsync: (dataType: DataTypes) => [
        ...getFromSharedStateAsyncKey,
        { data_type: dataType },
    ],
    getFromSharedStateMultiWriter: (dataType: DataTypes) => [
        ...getFromSharedStateMultiWriterKey,
        { data_type: dataType },
    ],
    insertIntoSharedStateKey: <T extends DataTypes>(
        dataType: T,
        data: DataTypeMap[T]
    ) => [...insertIntoSharedStateKey, { data_type: dataType, json: data }],
};
