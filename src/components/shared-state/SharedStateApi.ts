import { QueryKey } from "@tanstack/react-query";

import {
    AllSharedStateTypes,
    SharedStateDataTypeKeys,
    SharedStateReturnType,
    sharedStateQueries,
} from "components/shared-state/SharedStateTypes";

import { callToRemoteNode } from "plugins/lime-plugin-mesh-wide-upgrade/src/utils/api";

import { UhttpdService, default as defaultApi } from "utils/uhttpd.service";

export const doSharedStateApiCall = async <T extends SharedStateDataTypeKeys>(
    queryKey: QueryKey,
    ip?: string
) => {
    const doCall = async (api: UhttpdService = defaultApi) => {
        const res = (await api.call(...queryKey)) as SharedStateReturnType<
            AllSharedStateTypes[T]
        >;
        // Don't count 404 as an error, it means not found
        if (res.error !== 0 && res.error !== 404) {
            throw Error(`Shared state error: ${res.error}`);
        }
        return res.data;
    };
    // Todo(kon): check if the ip is not this node
    if (ip) {
        return await callToRemoteNode({
            ip,
            apiCall: (customApi) => doCall(customApi),
        });
    }
    return await doCall();
};

async function syncDataType({
    dataType,
    ip,
}: {
    dataType: SharedStateDataTypeKeys;
    ip: string;
}) {
    const queryKey = sharedStateQueries.syncFromSharedState(dataType, [ip]);
    return doSharedStateApiCall<typeof dataType>(queryKey);
}

export async function syncDataTypes({
    ip,
    dataTypes,
}: {
    ip: string;
    dataTypes: SharedStateDataTypeKeys[];
}) {
    const promises = dataTypes.map((dataType) =>
        syncDataType({ dataType, ip })
    );
    return await Promise.all(promises);
}
