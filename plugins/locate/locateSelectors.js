export const getLocation = (state) => {
  if (typeof state.locate.station !== 'undefined') {
    return {
      lat: Number (state.locate.station.lat),
      lon: Number (state.locate.station.lon)
    };
  }
  return {
    lat: 0,
    lon: 0
  };
};

export const getUserLocation = (state) => {
  return state.locate.user;
};
