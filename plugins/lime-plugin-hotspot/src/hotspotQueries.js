import { useQuery, useMutation } from 'react-query';
import { enable, isConnected, disable } from './hotspotApi';
import queryCache from 'utils/queryCache';

export const useIsConnected = (queryConfig) =>
    useQuery(['lime-utils-admin', 'hotspot_wwan_is_connected'], isConnected, queryConfig);

const isConnectedOrFail = async () => {
    const connectionStatus = await isConnected();
    if (connectionStatus.connected) {
        return connectionStatus;
    }
    throw Error('not connected');
}

export const  useWaitForConnect = (queryConfig) =>
    useQuery(['lime-utils-admin', 'hotspot_wwan_wait_for_connected'], isConnectedOrFail, {
        ...queryConfig,
        retry: (failureCount) => {
            if (failureCount == 3) {
                disable();
                return false;
            }
            return true;
        },
        retryDelay: () => 3000,
        onSuccess: data => queryCache.setQueryData(['lime-utils-admin', 'hotspot_wwan_is_connected'], data),
    });

export const useEnableHotspot = () =>
    useMutation(enable, {
        onSuccess: (data) => queryCache.invalidateQueries(
            ['lime-utils-admin', 'hotspot_wwan_is_connected']
        )
    });

