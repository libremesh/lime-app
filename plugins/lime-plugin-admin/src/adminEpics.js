import {
	RELOAD_CONFIG,
	SET_CONFIG,
	SET_CONFIG_SUCCESS,
	SET_CONFIG_ERROR
} from './adminConstants';

import {
	changeConfig
} from './adminApi';

import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';

const setConfig = (action$, _store, { wsAPI }) =>
	action$.pipe(
		ofType(SET_CONFIG),
		mergeMap((action) => changeConfig(wsAPI, action.payload).pipe(
			map( payload => ({ type: SET_CONFIG_SUCCESS, payload })),
			catchError( error => ([{ type: SET_CONFIG_ERROR, payload: error }]) )
		))
	);


export default {
	setConfig
};
