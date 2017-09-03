export const getLocation = (api, sid) => api.call(sid, 'get_location', {});

export const changeLocation = (api, sid, location) => api.call(sid, 'set_location', location);
