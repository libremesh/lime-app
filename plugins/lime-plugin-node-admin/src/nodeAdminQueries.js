import { useQuery, useMutation } from 'react-query';
import queryCache from 'utils/queryCache';
import {
    getWifiData, getAdminWifiData, changeHostname,
    changeApNamePassword, setupRoamingAP
} from './nodeAdminApi';

export const useChangeHostname = () =>
    useMutation(changeHostname, {
        onSuccess: () =>
            queryCache.setQueryData('changes-need-reboot', true)
    });

export const useWifiData = () =>
    useQuery(['lime-utils', 'get_wifi_data'], getWifiData);

export const useAdminWifiData = () =>
    useQuery(['lime-utils-admin', 'get_wifi_data'], getAdminWifiData);

export const useChangeAPPassword = () =>
    useMutation(changeApNamePassword, {
        onSuccess: () => {
            queryCache.setQueryData('changes-need-reboot', true);
            queryCache.invalidateQueries(['lime-utils', 'get_wifi_data']);
            queryCache.invalidateQueries(['lime-utils-admin', 'get_wifi_data']);
        }
    });

export const useSetupRoamingAP = () =>
    useMutation(setupRoamingAP, {
        onSuccess: () => {
            queryCache.setQueryData('changes-need-reboot', true);
            queryCache.invalidateQueries(['lime-utils', 'get_wifi_data']);
            queryCache.invalidateQueries(['lime-utils-admin', 'get_wifi_data']);
        }
    });
