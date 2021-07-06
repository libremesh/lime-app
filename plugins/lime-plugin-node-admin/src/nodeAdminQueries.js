import { useQuery, useMutation } from 'react-query';
import queryCache from 'utils/queryCache';
import {
    getWifiData, getAdminWifiData, changeHostname,
    changeApNamePassword, setupRoamingAP
} from './nodeAdminApi';

export const useChangeHostname = () =>
    useMutation(changeHostname, {
        onSuccess: (hostname) => queryCache.setQueryData(['system', 'board'],
            oldData => ({ ...oldData, hostname: hostname })
        )
    });

export const useWifiData = () =>
    useQuery(['lime-utils', 'get_wifi_data'], getWifiData);

export const useAdminWifiData = () =>
    useQuery(['lime-utils-admin', 'get_wifi_data'], getAdminWifiData);

export const useChangeAPPassword = () =>
    useMutation(changeApNamePassword);

export const useSetupRoamingAP = () =>
    useMutation(setupRoamingAP);