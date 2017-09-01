export const getLocation = (api, sid) => {
  return api.call(sid, 'get_location', {});
};

export const changeLocation = (api, sid, location) => {
  return api.call(sid, 'set_location', location);
};
