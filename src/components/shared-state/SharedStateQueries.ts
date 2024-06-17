import { useMutation } from "@tanstack/react-query";

import {
    doSharedStateApiCall,
    syncDataTypes,
} from "components/shared-state/SharedStateApi";
import {
    sharedStateQueries,
    syncFromSharedStateKey,
} from "components/shared-state/SharedStateQueriesKeys";
import { SharedStateDataTypeKeys } from "components/shared-state/SharedStateTypes";
import { useErrrorConnectionToast } from "components/toast/toasts";

export interface ISharedStateRemoteQueryProps {
    ip: string;
    params?: any;
}

/**
 * Execute "shared-state-async" "publish_all" call, which will publish all data types
 * @param ip
 * @param opts
 */
export const usePublishAll = ({
    ip,
    ...opts
}: ISharedStateRemoteQueryProps) => {
    const { show } = useErrrorConnectionToast();

    return useMutation<any, any, { ip: string }>({
        mutationFn: ({ ip }) =>
            doSharedStateApiCall(
                sharedStateQueries.publishAllFromSharedState(),
                ip
            ),
        mutationKey: [sharedStateQueries.publishAllFromSharedState(), ip],
        onError: () => {
            show(ip);
        },
        ...opts,
    });
};

type ISyncDataTypesProps = {
    dataTypes: SharedStateDataTypeKeys[];
} & ISharedStateRemoteQueryProps;

/**
 * Promise all a sync of all data types from shared state from remote node.
 * Run "shared-state-async", "sync", { data_type: dataType, peers_ip: [ip]}
 * @param ip
 * @param dataTypes
 * @param params
 */
export const useSyncDataTypes = ({
    ip,
    dataTypes,
    params,
}: ISyncDataTypesProps) => {
    return useMutation(syncDataTypes, {
        mutationKey: [syncFromSharedStateKey, ip, ...dataTypes],
        ...params,
    });
};
