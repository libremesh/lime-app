// Here you define the api calls to the ubus uhttpd enpoints your plugin needs
import api from 'utils/uhttpd.service';

export const getPortalConfig = () =>
    api.call('pirania', 'get_portal_config', {});

export const setPortalConfig = (config) =>
    api.call('pirania', 'set_portal_config', config);

export const getPortalContent = () =>
    api.call('pirania-app', 'read_content', {});

export const setPortalContent = (content) =>
    api.call('pirania-app', 'write_content', content);

export const createCompression = (logoFile) =>
    new Promise(res => {
        const reader = new FileReader();
        reader.onloadend = function () {
            res(reader.result);
        }
        reader.readAsDataURL(logoFile);
    });

