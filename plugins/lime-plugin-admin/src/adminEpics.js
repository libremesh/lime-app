import {
	RELOAD_CONFIG,
	SET_CONFIG,
	SET_CONFIG_SUCCESS,
	SET_CONFIG_ERROR,
	AUTH_LOGIN,
	AUTH_LOGIN_SUCCESS
} from './adminConstants';

import { CONECTION_CHANGE_URL } from '../../lime-plugin-core/src/metaConstants';

import {
	login,
	changeConfig
} from './adminApi';

import { from } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, delay } from 'rxjs/operators';

const loginAction = ( action$, store, { wsAPI } ) =>
	action$.pipe(
		ofType(AUTH_LOGIN),
		mergeMap( action => login(store.value.admin.sid, wsAPI,action.payload).pipe(
			map((sid) => ({ type: AUTH_LOGIN_SUCCESS, payload: sid })),
			catchError(error => ([{
				type: 'NOTIFICATION',
				payload: { msg: 'Wrong password, try again.', error }
			}]))
		))
	);

const setConfig = (action$, store, { wsAPI }) =>
	action$.pipe(
		ofType(SET_CONFIG),
		mergeMap((action) => changeConfig(wsAPI, store.value.admin.sid, action.payload).pipe(
			map( payload => ({ type: SET_CONFIG_SUCCESS, payload })),
			catchError( error => ([{ type: SET_CONFIG_ERROR, payload: error }]) )
		))
	);


const whaitAndReload = (action$, store, { wsAPI }) =>
	action$.pipe(
		ofType(SET_CONFIG_SUCCESS),
		mergeMap((payload) => from(
			[
				{ type: CONECTION_CHANGE_URL, payload: 'http://' + store.value.admin.hostname + '/ubus' },
				{ type: RELOAD_CONFIG }
			]).pipe(delay(60000)
		))
	);

export default {
	loginAction,
	setConfig,
	whaitAndReload
};
