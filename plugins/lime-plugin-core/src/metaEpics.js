import {
	CONECTION_START,
	CONECTION_SUCCESS,
	CONECTION_ERROR,
	CONECTION_CHANGE_URL,
	CONECTION_SETTINGS,
	CONECTION_LOAD_NEIGHBORS,
	CONECTION_LOAD_NEIGHBORS_SUCCESS,
	CONECTION_LOAD_HOSTNAME,
	CONECTION_LOAD_HOSTNAME_SUCCESS,
	AUTH_LOGIN,
	AUTH_LOGIN_SUCCESS,
	COMMUNITY_SETTINGS_LOAD_SUCCESS,
	SET_HOSTNAME,
	SET_HOSTNAME_SUCCESS,
	SET_HOSTNAME_ERROR
} from './metaConstants';

import {
	changeUrl,
	getHostname,
	getCloudNodes,
	login,
	getCommunitySettings,
	setHostname
} from './metaApi';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';


import { push } from 'preact-router-redux';

const conectionOff = ( action$ ) =>
	action$.ofType(CONECTION_START)
		.map((action) => ({ type: CONECTION_SETTINGS, payload: { conection: false, ws: action.payload } }));

const conectionAction = ( action$, store, { wsAPI } ) =>
	action$.ofType(CONECTION_START)
		.mergeMap( url => wsAPI.connect(url.payload)
			.mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } })
			.catch(error => ([{
				type: 'NOTIFICATION',
				payload: { msg: 'Not UBUS api in remote device', error }
			},{
				type: CONECTION_ERROR,
				payload: 'http://thisnode.info/ubus'
			}]))
		);

const changeUrlAction = ( action$, store, { wsAPI } ) =>
	action$.ofType(CONECTION_CHANGE_URL)
		.mergeMap( url => changeUrl(wsAPI, url.payload)
			.mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } })
			.catch(error => ([{
				type: 'NOTIFICATION',
				payload: { msg: 'Not UBUS api in remote device', error }
			},{
				type: CONECTION_START,
				payload: 'http://thisnode.info/ubus'
			}]))
		);


const loadHostname = ( action$, store, { wsAPI }) =>
	action$.ofType(...[CONECTION_LOAD_HOSTNAME,AUTH_LOGIN_SUCCESS])
		.mergeMap(() => getHostname(wsAPI, store.getState().meta.sid))
		.map(payload => ({ type: CONECTION_LOAD_HOSTNAME_SUCCESS, payload }));

const changeHostname = (action$, store, { wsAPI }) =>
	action$.ofType(SET_HOSTNAME)
		.mergeMap((action) => setHostname(wsAPI, store.getState().meta.sid, action.payload)
			.map( payload => ({ type: SET_HOSTNAME_SUCCESS, payload }))
			.catch( error => ([{ type: SET_HOSTNAME_ERROR, payload: error }]) ));

const loadNetwork = ( action$, store, { wsAPI }) =>
	action$.ofType(...[CONECTION_LOAD_NEIGHBORS, CONECTION_LOAD_HOSTNAME_SUCCESS])
		.mergeMap(() => getCloudNodes(wsAPI,store.getState().meta.sid))
		.map(payload => ({ type: CONECTION_LOAD_NEIGHBORS_SUCCESS, payload }));
 
const defaultLoginAction = ( action$ ) =>
	action$.ofType(CONECTION_SUCCESS)
		.mapTo({ type: AUTH_LOGIN, payload: { username: 'lime-app', password: 'generic' } });

const loginAction = ( action$, store, { wsAPI } ) =>
	action$.ofType(AUTH_LOGIN)
		.mergeMap( action => login(store.getState().meta.sid, wsAPI,action.payload))
		.map((sid) => ({ type: AUTH_LOGIN_SUCCESS, payload: sid }));

const redirectOnConnection = ( action$, store ) =>
	action$.ofType(AUTH_LOGIN_SUCCESS)
		.mapTo(push(store.getState().meta.home));

const communitySettings = (action$, store, { wsAPI } ) =>
	action$.ofType(AUTH_LOGIN_SUCCESS)
		.mergeMap( action => getCommunitySettings(wsAPI, store.getState().meta.sid))
		.map((settings) => ({ type: COMMUNITY_SETTINGS_LOAD_SUCCESS, payload: settings }));

const closeNotificatins = (action$, store, { wsAPI } ) =>
	action$.ofType('NOTIFICATION')
		.mergeMap(() => Observable.of({ type: 'NOTIFICATION_HIDE' }).delay(2000));

export default {
	conectionOff,
	conectionAction,
	changeUrlAction,
	loadNetwork,
	loadHostname,
	defaultLoginAction,
	loginAction,
	redirectOnConnection,
	communitySettings,
	changeHostname,
	closeNotificatins
};
