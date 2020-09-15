import {
	SET_HOSTNAME,
	SET_HOSTNAME_SUCCESS,
	SET_HOSTNAME_ERROR
} from './adminConstants';

import {
	changeHostname
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


export default {
	setHostname
};
