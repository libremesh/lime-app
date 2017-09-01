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

import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { push } from 'preact-router-redux';

const genericUbus = ( action$, store, { wsAPI } ) =>
  action$.ofType('UBUSCALL')
    .map(x => x.payload)
    .mergeMap( payload => wsAPI.call(
      store.getState().meta.sid,
      payload.action,
      payload.data,
      payload.method,
      payload.path
    ).catch(payload => ([{type:'UBUSCALL_ERROR', payload}])))
    .map(payload => ({ type: 'UBUSCALL_SUCCESS', payload }));
    


const conectionOff = ( action$ ) =>
  action$.ofType(CONECTION_START)
    .map((action) => ({type: CONECTION_SETTINGS, payload: {conection: false, ws: action.payload }}));

const conectionAction = ( action$, store, { wsAPI } ) =>
  action$.ofType(CONECTION_START)
    .mergeMap( url => wsAPI.conect(url.payload))
    .mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } });

const changeUrlAction = ( action$, store, { wsAPI } ) =>
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

const redirectOnConnection = ( action$, store ) =>
  action$.ofType(CONECTION_SUCCESS)
    .mapTo(push(store.getState().meta.home));


export default {
  genericUbus,
  conectionOff,
  conectionAction,
  changeUrlAction,
  loadNetwork,
  loadHostname,
  defaultLoginAction,
  loginAction,
  redirectOnConnection
};