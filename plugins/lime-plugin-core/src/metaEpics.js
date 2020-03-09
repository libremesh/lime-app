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
	COMMUNITY_SETTINGS_LOAD_SUCCESS
} from './metaConstants';

import {
	changeUrl,
	getHostname,
	getCloudNodes,
	login,
	getCommunitySettings
} from './metaApi';

import { from, of } from 'rxjs';
import { ofType } from 'redux-observable';
import { map, mergeMap, mapTo, catchError, delay } from 'rxjs/operators';

import I18n from 'i18n-js';

import { push } from 'react-router-redux';

const conectionOff = ( action$ ) =>
	action$.pipe(
		ofType(CONECTION_START),
		map((action) => ({ type: CONECTION_SETTINGS, payload: { conection: false, ws: action.payload } }))
	);

const conectionAction = ( action$, store, { wsAPI } ) =>
	action$.pipe(
		ofType(CONECTION_START),
		mergeMap( url => from(wsAPI.connect(url.payload)).pipe(
			mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } }),
			catchError(error => ([{
				type: CONECTION_CHANGE_URL,
				payload: 'http://thisnode.info/ubus',
				error: true
			}]))
		))
	);

const changeUrlAction = ( action$, store, { wsAPI } ) =>
	action$.pipe(
		ofType(CONECTION_CHANGE_URL),
		mergeMap( url => changeUrl(wsAPI, url.payload).pipe(
			mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } }),
			catchError(error => ([
				{
					type: 'NOTIFICATION',
					payload: { msg: I18n.t('This node is not compatible with LimeApp'), error }
				},
				...(url.error !== true? [{
					type: CONECTION_START,
					payload: 'http://thisnode.info/ubus'
				}]: [{
					type: CONECTION_ERROR
				}])
			])))
		)
	);


const loadHostname = ( action$, store, { wsAPI }) =>
	action$.pipe(
		ofType(...[CONECTION_LOAD_HOSTNAME,AUTH_LOGIN_SUCCESS]),
		mergeMap(() => getHostname(wsAPI, store.value.meta.sid)),
		map(payload => ({ type: CONECTION_LOAD_HOSTNAME_SUCCESS, payload }))
	);

const loadNetwork = ( action$, store, { wsAPI }) =>
	action$.pipe(
		ofType(...[CONECTION_LOAD_NEIGHBORS, CONECTION_LOAD_HOSTNAME_SUCCESS]),
		mergeMap(() => getCloudNodes(wsAPI,store.value.meta.sid)),
		map(payload => ({ type: CONECTION_LOAD_NEIGHBORS_SUCCESS, payload }))
	);

const defaultLoginAction = ( action$ ) =>
	action$.pipe(
		ofType(CONECTION_SUCCESS),
		mapTo({ type: AUTH_LOGIN, payload: { username: 'lime-app', password: 'generic' } })
	);

const loginAction = ( action$, store, { wsAPI } ) =>
	action$.pipe(
		ofType(AUTH_LOGIN),
		mergeMap( action => login(store.value.meta.sid, wsAPI,action.payload)),
		map((sid) => ({ type: AUTH_LOGIN_SUCCESS, payload: sid }))
	);

const redirectOnConnection = ( action$, store ) =>
	action$.pipe(
		ofType(AUTH_LOGIN_SUCCESS),
		map(() => window.location.href.split('#')[1] === '/'
			|| window.location.href.split('#').length === 1
			? push(store.value.meta.home)
			: { type: '_no_redirect' }
		)
	);

const communitySettings = (action$, store, { wsAPI } ) =>
	action$.pipe(
		ofType(AUTH_LOGIN_SUCCESS),
		mergeMap( action => from(getCommunitySettings(wsAPI, store.value.meta.sid))),
		map((settings) => ({ type: COMMUNITY_SETTINGS_LOAD_SUCCESS, payload: settings }))
	);

const closeNotificatins = (action$, store, { wsAPI } ) =>
	action$.pipe(
		ofType('NOTIFICATION'),
		mergeMap(() => of({ type: 'NOTIFICATION_HIDE' }).pipe(delay(2000)))
	);

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
	closeNotificatins
};
