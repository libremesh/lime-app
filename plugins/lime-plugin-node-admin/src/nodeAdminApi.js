import api from 'utils/uhttpd.service';
import { resolveOverrides } from 'utils/limeConfig';

export const changeHostname = (hostname) =>
    api.call('lime-utils-admin', 'set_hostname', { hostname })
        .then(() => hostname);

export const changeApNamePassword = ({password, enablePassword}) =>
<<<<<<< HEAD
    api.call('wireless-service-admin', 'set_node_ap',
        { password: password, "has_password": enablePassword });

export const getAPsData = () =>
    api.call('wireless-service', 'get_access_points_data', {});
=======
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
>>>>>>> improvement(nodeAdmin): adapt endpoints to _cfg_overrides api

export const getAdminApsData = () =>
    api.call('wireless-service-admin', 'get_access_points_data', {});

export const setupRoamingAP = ({enabled}) =>
<<<<<<< HEAD
    api.call('wireless-service-admin', 'set_community_ap', {enabled})
=======
    api.call('lime-utils-admin', 'setup_roaming_ap', {enabled})
>>>>>>> improvement(nodeAdmin): adapt endpoints to _cfg_overrides api
