import api from 'utils/uhttpd.service';

export const searchNetworks = (api, rescan) =>
	api.call('lime-fbw', 'search_networks', { scan: rescan || false });

export const setNetwork = (api, { file, hostname }) =>
	api.call('lime-fbw', 'set_network', { file, hostname });

export const createNetwork = (api, { network, hostname, adminPassword }) =>
	api.call('lime-fbw', 'create_network', { network, hostname, adminPassword });

export const getFbwStatus = () =>
	api.call('lime-fbw', 'status', {}).toPromise()
		.catch(() => ({ lock: false }));

export const dismissFbw = () =>
	api.call('lime-fbw', 'dismiss', {}).toPromise();
