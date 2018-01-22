import {
	RELOAD_CONFIG,
	SET_CONFIG,
	SET_CONFIG_SUCCESS,
	SET_CONFIG_ERROR,
	AUTH_LOGIN,
	AUTH_LOGIN_SUCCESS
} from './adminConstants';

import { CONECTION_CHANGE_URL } from '../../lime-plugin-core/src/metaConstants'

import {
	login,
	changeConfig
} from './adminApi';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';

const loginAction = ( action$, store, { wsAPI } ) =>
	action$.ofType(AUTH_LOGIN)
		.mergeMap( action => login(store.getState().admin.sid, wsAPI,action.payload)
			.map((sid) => ({ type: AUTH_LOGIN_SUCCESS, payload: sid }))
			.catch(error => ([{
				type: 'NOTIFICATION',
				payload: { msg: 'Wrong password, try again.', error }
			}])));

const setConfig = (action$, store, { wsAPI }) =>
	action$.ofType(SET_CONFIG)
		.mergeMap((action) => changeConfig(wsAPI, store.getState().admin.sid, action.payload)
			.map( payload => ({ type: SET_CONFIG_SUCCESS, payload }))
			.catch( error => ([{ type: SET_CONFIG_ERROR, payload: error }]) ));


const whaitAndReload = (action$, store, { wsAPI }) =>
	action$.ofType(SET_CONFIG_SUCCESS)
		.mergeMap((payload) => Observable.from(
			[
				{ type: CONECTION_CHANGE_URL, payload: 'http://' + store.getState().admin.hostname + '/ubus' },
				{ type: RELOAD_CONFIG }
			]
		).delay(60000));
		

export default {
	loginAction,
	setConfig,
	whaitAndReload
};
