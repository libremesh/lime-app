export const getLocation = (api, sid) => api.call(sid, 'lime-location','get', {});

export const changeLocation = (api, sid, location) => api.call(sid, 'lime-location','set', location);
