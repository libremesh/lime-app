import { useQuery, useMutation } from 'react-query';
import { enable, disable, getStatus } from './hotspotApi';
import queryCache from 'utils/queryCache';

export const useHotspotData = (queryConfig) =>
    useQuery(['lime-utils-admin', 'hotspot_wwan_get_status'], getStatus, queryConfig);

async function toggle(enabled) {
    return enabled ? enable(): disable();
}

export const useToggleHotspot = () =>
    useMutation(toggle, {
        onSuccess: (data) => queryCache.invalidateQueries(
            ['lime-utils-admin', 'hotspot_wwan_get_status']
        )
    });
