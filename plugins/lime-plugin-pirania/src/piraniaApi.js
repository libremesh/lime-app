// Here you define the api calls to the ubus uhttpd enpoints your plugin needs
import api from 'utils/uhttpd.service';

export const getPortalConfig = () =>
    api.call('pirania', 'get_portal_config', {});

export const setPortalConfig = (config) =>
    api.call('pirania', 'set_portal_config', config);
