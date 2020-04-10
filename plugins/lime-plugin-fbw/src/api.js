export const getStatus = (api, sid) => api.call(sid, 'lime-fbw', 'status', {});

export const searchNetworks = (api, sid, rescan) => api.call(sid, 'lime-fbw', 'search_networks', { scan: rescan || false });

export const setNetwork = (api, sid, { file, hostname }) => api.call(sid, 'lime-fbw', 'set_network', { file, hostname });

export const createNetwork = (api, sid, { network, hostname, password } ) =>
    api.call(sid, 'lime-fbw', 'create_network', { network, hostname, password });
