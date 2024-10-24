import {
    AllSharedStateTypes,
    SharedStateDataTypeKeys,
} from "components/shared-state/SharedStateTypes";

const getFromSharedStateKey = ["shared-state-async", "get"];
const insertIntoSharedStateKey = ["shared-state-async", "insert"];
export const syncFromSharedStateKey = ["shared-state-async", "sync"];
const publishAllFromSharedStateKey = ["shared-state-async", "publish_all"];

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
