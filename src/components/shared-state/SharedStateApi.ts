import { QueryKey } from "@tanstack/react-query";

import { sharedStateQueries } from "components/shared-state/SharedStateQueriesKeys";
import {
    AllSharedStateTypes,
    SharedStateDataTypeKeys,
    SharedStateReturnType,
} from "components/shared-state/SharedStateTypes";

import { MeshUpgradeApiErrorTypes } from "plugins/lime-plugin-mesh-wide-upgrade/src/meshUpgradeTypes";

import { login } from "utils/queries";
import { UhttpdService, default as defaultApi } from "utils/uhttpd.service";

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
    if (ip) {
        return await callToRemoteNode({
            ip,
            apiCall: (customApi) => doCall(customApi),
        });
    }
    return await doCall();
};

/**
 * Wrapper to do calls to a remote node and returns the result or throws an error
 *
 * First it tries to login and if success do a specific call to the remote node
 * @param ip
 * @param apiMethod
 */
export async function callToRemoteNode<T>({
    ip,
    apiCall,
    username = "lime-app",
    password = "generic",
}: {
    ip: string;
    apiCall: (customApi: UhttpdService) => Promise<T>;
    username?: string;
    password?: string;
}) {
    const customApi = new UhttpdService(ip);
    // Todo(kon): check if the ip is not this node ip or there are an active stored session
    try {
        await login({ username, password, customApi });
    } catch (error) {
        throw new RemoteNodeCallError(
            `Cannot login`,
            customApi.customIp,
            error
        );
    }
    try {
        return await apiCall(customApi);
    } catch (error) {
        let additionalInfo = "";
        if (error instanceof MeshUpgradeApiError) {
            additionalInfo = `: ${error.message}`;
        }
        throw new RemoteNodeCallError(
            `Cannot do remote call${additionalInfo}`,
            ip,
            error
        );
    }
}

export class RemoteNodeCallError extends Error {
    ip: string;
    error: Error;
    constructor(message: string, ip: string, error: Error) {
        super(message); // Pass the message to the Error constructor
        this.name = "ParallelMutationError"; // Set the name of the error
        this.ip = ip;
        this.error = error;

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, RemoteNodeCallError.prototype);
    }
}

export class MeshUpgradeApiError extends Error {
    message: string;
    code: MeshUpgradeApiErrorTypes;
    constructor(message: string, code: MeshUpgradeApiErrorTypes) {
        super(message); // Pass the message to the Error constructor
        this.name = "MeshUpgradeApiError"; // Set the name of the error
        this.message = message;
        this.code = code;
        Object.setPrototypeOf(this, MeshUpgradeApiError.prototype);
    }
}
