import { useQuery, useMutation } from 'react-query';
import { enable, disable, getStatus } from './hotspotApi';
import queryCache from 'utils/queryCache';

export const useHotspotData = (queryConfig) =>
    useQuery(['lime-utils', 'hotspot_wwan_get_status'], getStatus, queryConfig);

async function toggle(enabled) {
    if (enabled) {
        return enable().then(() => true);
    }
    return disable().then(() => false);
}

export const useToggleHotspot = () =>
    useMutation(toggle, {
        onSuccess: (enabled) => queryCache.setQueryData(
            ['lime-utils', 'hotspot_wwan_get_status'],
            { enabled, waitingForRadioReset: true })
    });
