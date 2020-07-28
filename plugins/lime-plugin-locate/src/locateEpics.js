import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';

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
const locateLoad = ( action$, _state$, { wsAPI } ) =>
	action$.pipe(
		ofType(...[LOCATION_LOAD,LOCATION_CHANGE_SUCCESS]),
		mergeMap(() => getLocation(wsAPI)),
		map((payload) => ({ type: LOCATION_LOAD_SUCCESS, payload }))
	);

const locateChange = ( action$, _state$, { wsAPI } ) =>
	action$.pipe(
		ofType(LOCATION_CHANGE),
		mergeMap((action) => changeLocation(wsAPI, action.payload)),
		map((payload) => ({ type: LOCATION_CHANGE_SUCCESS }))
	);

const locateLoadlinks = ( action$, _state$, { wsAPI } ) =>
	action$.pipe(
		ofType(...[LOCATION_LOAD_LINKS]),
		mergeMap(() => getNodesandlinks(wsAPI)),
		map((payload = {}) => payload.result
			? { type: LOCATION_LOAD_LINKS_SUCCESS, payload: payload.result }
			: { type: LOCATION_LOAD_LINKS_ERROR })
	);

export default { locateLoad, locateChange, locateLoadlinks };
