import api from 'utils/uhttpd.service';

export const changeHostname = (hostname) => 
    api.call('lime-utils-admin', 'set_hostname', { hostname })
        .then(() => hostname);

export const changeApNamePassword = ({password, enablePassword}) =>
    api.call('lime-utils-admin', 'set_ap_password',
        { ap: 'ap_name', password: password, "has_password": enablePassword });

export const getWifiData = () =>
    api.call('lime-utils', 'get_wifi_data');

export const getAdminWifiData = () =>
    api.call('lime-utils-admin', 'get_wifi_data');
