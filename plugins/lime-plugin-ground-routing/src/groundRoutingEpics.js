import { getGroundRouting, setGroundRouting } from './groundRoutingApi';

import { ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
	GROUNDROUTING_GET,
	GROUNDROUTING_GET_SUCCESS,
	GROUNDROUTING_GET_ERROR,
	GROUNDROUTING_SET,
	GROUNDROUTING_SET_SUCCESS,
	GROUNDROUTING_SET_ERROR
} from './groundRoutingConstants';

const getGroundRoutingEpic = ( action$, state$, { wsAPI } ) =>
	action$.pipe(
		ofType(...[GROUNDROUTING_GET,GROUNDROUTING_SET_SUCCESS]),
		mergeMap(() => getGroundRouting(wsAPI, state$.value.meta.sid)),
		map( groundRouting => ({ type: GROUNDROUTING_GET_SUCCESS, payload: groundRouting })),
		catchError( error => [({ type: GROUNDROUTING_GET_ERROR, payload: error })])
	);

const setGroundRoutingEpic = ( action$, state$, { wsAPI } ) =>
	action$.pipe(
		ofType(GROUNDROUTING_SET),
		map(action => action.payload.config),
		mergeMap((config) => setGroundRouting(wsAPI, state$.value.meta.sid, { config }).pipe(
			map( success => ({ type: GROUNDROUTING_SET_SUCCESS, payload: success })),
			catchError( error => [({ type: GROUNDROUTING_SET_ERROR, payload: error })])
		))
	);

export default { getGroundRoutingEpic, setGroundRoutingEpic };