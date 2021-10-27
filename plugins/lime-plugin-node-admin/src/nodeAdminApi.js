import api from 'utils/uhttpd.service';

export const changeHostname = (hostname) =>
    api.call('lime-utils-admin', 'set_hostname', { hostname })
        .then(() => hostname);

export const changeApNamePassword = ({password, enablePassword}) =>
    api.call('wireless-service-admin', 'set_node_ap',
        { password: password, "has_password": enablePassword });

export const getAPsData = () =>
    api.call('wireless-service', 'get_access_points_data', {});

export const getAdminApsData = () =>
    api.call('wireless-service-admin', 'get_access_points_data', {});

export const setupRoamingAP = ({enabled}) =>
    api.call('wireless-service-admin', 'set_community_ap', {enabled})
