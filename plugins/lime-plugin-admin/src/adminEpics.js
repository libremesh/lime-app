import {
	SET_HOSTNAME,
	SET_HOSTNAME_SUCCESS,
	SET_HOSTNAME_ERROR,
	GET_IP_SUCCESS
} from './adminConstants';

import {
	changeHostname,
	getIpV4
} from './adminApi';

import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';

const setHostname = (action$, _store, { wsAPI }) =>
	action$.pipe(
		ofType(SET_HOSTNAME),
		mergeMap((action) => changeHostname(wsAPI, action.payload).pipe(
			map( payload => ({ type: SET_HOSTNAME_SUCCESS, payload })),
			catchError( error => ([{ type: SET_HOSTNAME_ERROR, payload: error }]) )
		))
	);

const _getIpV4 = (action$, _store, { wsAPI }) =>
	action$.pipe(
		ofType(SET_HOSTNAME_SUCCESS),
		mergeMap((action) => getIpV4(wsAPI, action.payload).pipe(
			map( payload => ({ type: GET_IP_SUCCESS, payload }))
		))
	);

export default {
	setHostname,
	_getIpV4
};
