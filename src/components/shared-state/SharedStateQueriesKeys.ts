import {
    AllSharedStateTypes,
    SharedStateDataTypeKeys,
} from "components/shared-state/SharedStateTypes";

import { ApiServiceParamsType } from "utils/standarizedApi";

const getFromSharedStateKey: ApiServiceParamsType = [
    "shared-state-async",
    "get",
];
const insertIntoSharedStateKey: ApiServiceParamsType = [
    "shared-state-async",
    "insert",
];
export const syncFromSharedStateKey: ApiServiceParamsType = [
    "shared-state-async",
    "sync",
];
const publishAllFromSharedStateKey: ApiServiceParamsType = [
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
