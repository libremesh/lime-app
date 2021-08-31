import api from 'utils/uhttpd.service';
import { resolveOverrides } from 'utils/limeConfig';

export const changeHostname = (hostname) => 
    api.call('lime-utils-admin', 'set_hostname', { hostname })
        .then(() => hostname);

export const changeApNamePassword = ({password, enablePassword}) =>
    api.call('lime-utils-admin', 'set_node_ap',
        { password: password, "has_password": enablePassword });

function resolveCfgOverrides(res) {
    const community_ap = {...res.community_ap};
    const overrides = resolveOverrides(community_ap._cfg_overrides);
    community_ap['community'] = overrides.community || overrides.default;
    return {
        ...res,
        community_ap
    }
}

export const getWifiData = () =>
    api.call('lime-utils', 'get_wifi_data').
        then(res => resolveCfgOverrides(res));

export const getAdminWifiData = () =>
    api.call('lime-utils-admin', 'get_wifi_data');

export const setupRoamingAP = ({enabled}) =>
    api.call('lime-utils-admin', 'setup_roaming_ap', {enabled})
