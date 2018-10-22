import { getGroundRouting, setGroundRouting } from './groundRoutingApi';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
	GROUNDROUTING_GET,
	GROUNDROUTING_GET_SUCCESS,
	GROUNDROUTING_GET_ERROR,
	GROUNDROUTING_SET,
	GROUNDROUTING_SET_SUCCESS,
	GROUNDROUTING_SET_ERROR
} from './groundRoutingConstants';

const getGroundRoutingEpic = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[GROUNDROUTING_GET,GROUNDROUTING_SET_SUCCESS])
		.mergeMap(() => getGroundRouting(wsAPI, state$.value.meta.sid))
		.map( groundRouting => ({ type: GROUNDROUTING_GET_SUCCESS, payload: groundRouting }))
		.catch( error => [({ type: GROUNDROUTING_GET_ERROR, payload: error })]);

const setGroundRoutingEpic = ( action$, state$, { wsAPI } ) =>
	action$.ofType(GROUNDROUTING_SET)
		.map(action => action.payload.config)
		.mergeMap((config) => setGroundRouting(wsAPI, state$.value.meta.sid, { config })
			.map( success => ({ type: GROUNDROUTING_SET_SUCCESS, payload: success }))
			.catch( error => [({ type: GROUNDROUTING_SET_ERROR, payload: error })])
		);

export default { getGroundRoutingEpic, setGroundRoutingEpic };