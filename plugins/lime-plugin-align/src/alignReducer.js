import {
	IFACES_LOAD_SUCCESS,
	STATIONS_LOAD_SUCCESS,
	STATION_SET,
	IFACE_SET,
	SIGNAL_GET_SUCCESS
} from './alignConstants';

export const initialState = {
	ifaces: [],
	stations: [],
	currentReading: {}
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {

		case IFACES_LOAD_SUCCESS:
			return Object.assign({}, state, { ifaces: payload.filter(x => x.name) });

		case STATIONS_LOAD_SUCCESS:
			return Object.assign({}, state, { stations: payload });

		case STATION_SET:
			return Object.assign({}, state, { currentReading: payload });

		case IFACE_SET:
			return Object.assign({}, state, { stations: state.stations.filter(x => x.iface === payload) });

		case SIGNAL_GET_SUCCESS:
			if (payload && state.currentReading.mac === payload.station) {
				let newCurrentReading = Object.assign({}, state.currentReading, { signal: payload.signal });
				let newStations = state.stations.map(station => {
					if (station.mac === payload.station) {
						station.signal = payload.signal;
					}
					return station;
				});
				return Object.assign({}, state, { currentReading: newCurrentReading,  stations: newStations });
			}
			return state;
      
		default:
			return state;
	}
};
