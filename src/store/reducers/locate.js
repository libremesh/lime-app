import {
  LOCATION_LOAD_SUCCESS,
  LOCATION_CHANGE_SUCCESS
} from '../actions/ActionTypes';


export const initialState = {
  station: {
    lon: 0,
    lat: 0
  },
  user: {
    lon: 0,
    lat: 0
  }
};


export default (state = initialState, { type, payload, meta }) => {
  switch (type) {

    case LOCATION_LOAD_SUCCESS:
      return Object.assign({}, state, {station: payload});

    case LOCATION_CHANGE_SUCCESS:
      return Object.assign({}, state, {station: payload});

    default:
      return state;
  }
};
