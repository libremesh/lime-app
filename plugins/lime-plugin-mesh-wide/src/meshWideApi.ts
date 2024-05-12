import { QueryKey } from "@tanstack/react-query";

import { callToRemoteNode } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";
import { getFromSharedStateKeys } from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import {
    DataTypeMap,
    DataTypes,
    SharedStateReturnType,
    completeDataTypeKeys,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import { UhttpdService, default as defaultApi } from "utils/uhttpd.service";

export const doSharedStateApiCall = async <T extends DataTypes>(
    queryKey: QueryKey,
    ip?: string
) => {
    const doCall = async (api: UhttpdService = defaultApi) => {
        const res = (await api.call(...queryKey)) as SharedStateReturnType<
            DataTypeMap[T]
        >;
        // Don't count 404 as an error, it means not found
        if (res.error !== 0 && res.error !== 404) {
            throw Error(`Shared state error: ${res.error}`);
        }
        return res.data;
    };
    if (ip) {
        return await callToRemoteNode({
            ip,
            apiCall: (customApi) => doCall(customApi),
        });
    }
    return await doCall();
};

/**
 * Sync all data types from shared state from remote node
 */

async function syncDataType({
    dataType,
    ip,
}: {
    dataType: DataTypes;
    ip: string;
}) {
    const queryKey = getFromSharedStateKeys.syncFromSharedState(dataType, [ip]);
    return doSharedStateApiCall<typeof dataType>(queryKey);
}

export async function syncAllDataTypes({ ip }: { ip: string }) {
    const promises = (Object.keys(completeDataTypeKeys) as DataTypes[]).map(
        (dataType) => syncDataType({ dataType, ip })
    );
    return await Promise.all(promises);
}
