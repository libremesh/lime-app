import {
  IFACES_LOAD_SUCCESS,
  STATIONS_LOAD_SUCCESS,
  STATION_SET,
  SIGNAL_GET_SUCCESS
} from '../actions/ActionTypes';

export const initialState = {
  ifaces: [],
  stations: [],
  currentReading: {}
};

export default (state = initialState, { type, payload, meta }) => {
  switch (type) {

    case IFACES_LOAD_SUCCESS:
      return Object.assign({}, state, {ifaces: payload});

    case STATIONS_LOAD_SUCCESS:
      return Object.assign({}, state, {stations: payload});

    case STATION_SET:
      return Object.assign({}, state, {currentReading: payload});
    
    case SIGNAL_GET_SUCCESS:
      //CHANGE CURRENT READING ONLY
      if (state.currentReading.mac === payload.station) {
        let newCurrentReading = Object.assign({}, state.currentReading, {signal: payload.signal});
        let newStations = state.stations.map(station => {
          if (station.mac === payload.station) {
            station.signal = payload.signal;
          }
          return station;
        });
        return Object.assign({}, state, {currentReading: newCurrentReading,  stations:newStations});
      }
      return state;
    default:
      return state;
  }
};
