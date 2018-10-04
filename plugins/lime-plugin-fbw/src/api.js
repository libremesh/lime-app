export const getStatus = (api, sid) => api.call(sid, 'firstbootwizard', 'status', {});

export const searchNetworks = (api, sid, rescan) => api.call(sid, 'firstbootwizard', 'search_networks', { scan: rescan || false });

export const setNetwork = (api, sid, file) => api.call(sid, 'firstbootwizard', 'set_network', { file });

// network -> { name: String }
export const createNetwork = (api, sid, network ) => api.call(sid, 'firstbootwizard', 'create_network', network);
