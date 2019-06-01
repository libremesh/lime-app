export const getLocation = (api, sid) => api.call(sid, 'lime-location','get', {});
export const getNodesandlinks = (api, sid) => api.call(sid, 'lime-location','all_nodes_and_links', {});

export const changeLocation = (api, sid, location) => api.call(sid, 'lime-location','set', location);
