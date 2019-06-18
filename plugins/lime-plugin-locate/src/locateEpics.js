import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { changeLocation, getLocation, getNodesandlinks } from './locateApi';

import {
	LOCATION_LOAD,
	LOCATION_LOAD_SUCCESS,
	LOCATION_LOAD_LINKS,
	LOCATION_LOAD_LINKS_SUCCESS,
	LOCATION_LOAD_LINKS_ERROR,
	LOCATION_CHANGE,
	LOCATION_CHANGE_SUCCESS
} from './locateConstants';


// LOAD INTERFACES -> Dispatch success and stations loads
const locateLoad = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[LOCATION_LOAD,LOCATION_CHANGE_SUCCESS])
		.mergeMap(() => getLocation(wsAPI, state$.value.meta.sid))
		.map((payload) => ({ type: LOCATION_LOAD_SUCCESS, payload }));

const locateChange = ( action$, state$, { wsAPI } ) =>
	action$.ofType(LOCATION_CHANGE)
		.mergeMap((action) => changeLocation(wsAPI, state$.value.meta.sid, action.payload))
		.map((payload) => ({ type: LOCATION_CHANGE_SUCCESS }));

const locateLoadlinks = ( action$, state$, { wsAPI } ) =>
	action$.ofType(...[LOCATION_LOAD_LINKS])
		.mergeMap(() => getNodesandlinks(wsAPI, state$.value.meta.sid))
		.map((payload = {}) => payload.result
			? { type: LOCATION_LOAD_LINKS_SUCCESS, payload: payload.result }
			: { type: LOCATION_LOAD_LINKS_ERROR });

export default { locateLoad, locateChange, locateLoadlinks };
