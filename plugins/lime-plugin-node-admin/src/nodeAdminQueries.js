import { useQuery, useMutation } from 'react-query';
import queryCache from 'utils/queryCache';
import {
    getAPsData, getAdminApsData, changeHostname,
    changeApNamePassword, setupRoamingAP
} from './nodeAdminApi';
import { setChangesNeedReboot } from 'utils/api';

export const useChangeHostname = () =>
    useMutation(changeHostname, {
        onSuccess: () => {
            setChangesNeedReboot('yes');
            queryCache.invalidateQueries('changes-need-reboot');
        }
    });

export const useWifiData = () =>
    useQuery(['lime-utils', 'get_wifi_data'], getAPsData);

export const useAdminWifiData = () =>
    useQuery(['lime-utils-admin', 'get_wifi_data'], getAdminApsData);

export const useChangeAPPassword = () =>
    useMutation(changeApNamePassword, {
        onSuccess: () => {
            setChangesNeedReboot('yes');
            queryCache.invalidateQueries('changes-need-reboot');
            queryCache.invalidateQueries(['lime-utils', 'get_wifi_data']);
            queryCache.invalidateQueries(['lime-utils-admin', 'get_wifi_data']);
        }
    });

export const useSetupRoamingAP = () =>
    useMutation(setupRoamingAP, {
        onSuccess: () => {
            setChangesNeedReboot('yes');
            queryCache.invalidateQueries('changes-need-reboot');
            queryCache.invalidateQueries(['lime-utils', 'get_wifi_data']);
            queryCache.invalidateQueries(['lime-utils-admin', 'get_wifi_data']);
        }
    });
