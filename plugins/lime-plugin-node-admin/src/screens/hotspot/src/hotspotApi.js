import api from 'utils/uhttpd.service';

export const enable = () =>
    api.call('lime-utils-admin', 'hotspot_wwan_enable', {}, null, 25000);

export const disable = () =>
    api.call('lime-utils-admin', 'hotspot_wwan_disable', {});

export const getStatus = () =>
    api.call('lime-utils', 'hotspot_wwan_get_status', {});
