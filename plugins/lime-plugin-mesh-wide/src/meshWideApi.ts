import { QueryKey } from "@tanstack/react-query";

import { callToRemoteNode } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";
import {
    getFromSharedStateKeys,
    publishAllFromSharedStateAsyncKey,
} from "plugins/lime-plugin-mesh-wide/src/meshWideQueriesKeys";
import {
    DataTypeMap,
    DataTypes,
    SharedStateReturnType,
    completeDataTypeKeys,
} from "plugins/lime-plugin-mesh-wide/src/meshWideTypes";

import api from "utils/uhttpd.service";

export const doSharedStateApiCall = async <T extends DataTypes>(
    queryKey: QueryKey
) => {
    const res = (await api.call(...queryKey)) as SharedStateReturnType<
        DataTypeMap[T]
    >;
    if (res.error !== 0 && res.error !== 404) {
        throw Error(`Shared state error: ${res.error}`);
    }
    return res.data;
};

/**
 * Sync all data types from shared state from remote node
 */

interface ISyncWithIpProps {
    ip: string;
}

export async function publishOnRemoteNode({ ip }: ISyncWithIpProps) {
    return await callToRemoteNode({
        ip,
        apiCall: (customApi) =>
            customApi
                .call(...publishAllFromSharedStateAsyncKey, {})
                .then(() => true),
    });
}

export async function syncDataType({
    dataType,
    ip,
}: {
    dataType: DataTypes;
    ip: string;
}) {
    const queryKey = getFromSharedStateKeys.syncFromSharedStateAsync(dataType, [
        ip,
    ]);
    return doSharedStateApiCall<typeof dataType>(queryKey);
}

export async function syncAllDataTypes({ ip }: { ip: string }) {
    const promises = (Object.keys(completeDataTypeKeys) as DataTypes[]).map(
        (dataType) => syncDataType({ dataType, ip })
    );
    return await Promise.all(promises);
}
