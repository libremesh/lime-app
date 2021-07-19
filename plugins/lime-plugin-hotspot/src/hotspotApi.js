import api from 'utils/uhttpd.service';

export const enable = () =>
    api.call('lime-utils-admin', 'hotspot_wwan_enable', {});

export const disable = () =>
    api.call('lime-utils-admin', 'hotspot_wwan_disable', {});


export const isConnected = () =>
    api.call('lime-utils-admin', 'hotspot_wwan_is_connected', {});
