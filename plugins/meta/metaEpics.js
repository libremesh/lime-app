import {
  CONECTION_START,
  CONECTION_ERROR,
  CONECTION_SUCCESS,
  CONECTION_CHANGE_URL,
  CONECTION_SETTINGS,
  CONECTION_LOAD_NEIGHBORS,
  CONECTION_LOAD_NEIGHBORS_SUCCESS,
  CONECTION_LOAD_HOSTNAME,
  CONECTION_LOAD_HOSTNAME_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS
} from './metaConstants';

import {
  changeUrl,
  getHostname,
  getCloudNodes,
  login
} from './metaApi';

const conectionOff = ( action$ ) =>
  action$.ofType(CONECTION_START)
    .mapTo((action) => ({type: CONECTION_SETTINGS, payload: {conection: false, ws: action.payload }}));

const conectionAction = ( action$, store, { wsAPI} ) =>
  action$.ofType(CONECTION_START)
    .mergeMap( url => wsAPI.conect(url.payload))
    .mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } });

const changeUrlAction = ( action$, store, { wsAPI} ) =>
  action$.ofType(CONECTION_CHANGE_URL)
    .mergeMap( url => changeUrl(wsAPI, url.payload))
    .mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } });

const loadHostname = ( action$, store, { wsAPI }) =>
  action$.ofType(...[CONECTION_LOAD_HOSTNAME,AUTH_LOGIN_SUCCESS])
    .mergeMap(() => getHostname(wsAPI, store.getState().meta.sid))
    .map(payload => ({type:CONECTION_LOAD_HOSTNAME_SUCCESS, payload}));

const loadNetwork = ( action$, store, { wsAPI }) =>
  action$.ofType(...[CONECTION_LOAD_NEIGHBORS, CONECTION_LOAD_HOSTNAME_SUCCESS])
    .mergeMap(() => getCloudNodes(wsAPI,store.getState().meta.sid))
    .map(payload => ({type:CONECTION_LOAD_NEIGHBORS_SUCCESS, payload}));
 
const defaultLoginAction = ( action$ ) =>
  action$.ofType(CONECTION_SUCCESS)
    .mapTo({ type: AUTH_LOGIN, payload: {user: 'admin', password: 'admin'}});

const loginAction = ( action$, store, { wsAPI } ) =>
  action$.ofType(AUTH_LOGIN)

    .mergeMap( action => login(wsAPI,action.payload))
    .map((sid) => ({ type: AUTH_LOGIN_SUCCESS, payload: sid }));


export default {
  conectionOff,
  conectionAction,
  changeUrlAction,
  loadNetwork,
  loadHostname,
  defaultLoginAction,
  loginAction
};