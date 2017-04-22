import {
  UPDATE_LOCATION,
  CONECTION_SUCCESS,
  CONECTION_START,
  CONECTION_CHANGE_URL,
  CONECTION_LOAD_NEIGHBORS_SUCCESS,
  CONECTION_LOAD_HOSTNAME_SUCCESS,
  CONECTION_CHANGE_CURRENT_BASE,
  AUTH_LOGIN_SUCCESS
} from './metaConstants';

const initialState = {
  title: 'LimeApp',
  sid: 'no_user',
  status: 'start',
  url: '/',
  conection: false,
  ws: '',
  interval: 1500,
  stations: [],
  base: '',
  selectedHost: ''
};

export const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case UPDATE_LOCATION:
      return Object.assign({}, state, payload);
    case CONECTION_START:
      return Object.assign({}, state, {conection: false, ws: payload, sid: 'no_user' });
    case CONECTION_CHANGE_URL:
      return Object.assign({}, state, {conection: false, ws: payload, sid: 'no_user'});
    case CONECTION_SUCCESS:
      return Object.assign({}, state, payload);
    case AUTH_LOGIN_SUCCESS:
      return Object.assign({}, state, {sid:payload});
    case CONECTION_LOAD_HOSTNAME_SUCCESS:
      if (state.base === ''){
        return Object.assign({}, state, {base: payload.hostname, selectedHost: payload.hostname});
      }
      return Object.assign({}, state, {selectedHost: payload.hostname});
    case CONECTION_CHANGE_CURRENT_BASE:
      return Object.assign({}, state, {selectedHost: payload.hostname});
    case CONECTION_LOAD_NEIGHBORS_SUCCESS:
      return Object.assign({}, state, {stations:payload.concat([state.base]).sort(),status:'ready'});
    default:
      return state;
  }
};
