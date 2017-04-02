import {
  CONECTION_START,
  CONECTION_ERROR,
  CONECTION_SUCCESS,
  CONECTION_CHANGE_URL,
  CONECTION_SETTINGS,
  CONECTION_LOAD_NEIGHBORS,
  CONECTION_LOAD_NEIGHBORS_SUCCESS,
  CONECTION_LOAD_HOSTNAME,
  CONECTION_LOAD_HOSTNAME_SUCCESS
} from './metaConstants';

import {
  AUTH_LOGIN_SUCCESS
} from '../auth/authConstants';

const conectionOff = ( action$ ) =>
  action$.ofType(CONECTION_START)
    .mapTo((action) => ({type: CONECTION_SETTINGS, payload: {conection: false, ws: action.payload }}));

const conectionAction = ( action$, store, { wsAPI} ) =>
  action$.ofType(CONECTION_START)
    .mergeMap( url => wsAPI.conect(url.payload))
    .mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } });

const changeUrlAction = ( action$, store, { wsAPI} ) =>
  action$.ofType(CONECTION_CHANGE_URL)
    .mergeMap( url => wsAPI.changeUrl(url.payload))
    .mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } });

const loadHostname = ( action$, store, { wsAPI }) =>
  action$.ofType(...[CONECTION_LOAD_HOSTNAME,AUTH_LOGIN_SUCCESS])
    .mergeMap(() => wsAPI.getHostname(store.getState().meta.sid))
    .map(payload => ({type:CONECTION_LOAD_HOSTNAME_SUCCESS, payload}));

const loadNetwork = ( action$, store, { wsAPI }) =>
  action$.ofType(...[CONECTION_LOAD_HOSTNAME_SUCCESS])
    .mergeMap(() => wsAPI.getNeighbors(store.getState().meta.sid))
    .map(payload => ({type:CONECTION_LOAD_NEIGHBORS_SUCCESS, payload}));
 

export default { conectionOff, conectionAction, changeUrlAction, loadNetwork, loadHostname };