const getCoordinate = (coord) => (state) => {
	// Not yet retrieved from the node.
	if (typeof(state.locate.station) === 'undefined') {
		return undefined;
	}
	// Neither community nor node has location configured
	const latlong = state.locate.station;
	if (latlong[coord] === 'FIXME') {
		return null;
	}
	return latlong[coord];
};

export const getLat = getCoordinate('lat');
export const getLon = getCoordinate('lon');
export const getUserLocation = (state) => state.locate.user;
export const isCommunityLocation = (state) => state.locate.isCommunity;
