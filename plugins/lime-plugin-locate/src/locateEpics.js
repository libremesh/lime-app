import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { changeLocation, getLocation } from './locateApi';

import {
	LOCATION_LOAD,
	LOCATION_LOAD_SUCCESS,
	LOCATION_CHANGE,
	LOCATION_CHANGE_SUCCESS
} from './locateConstants';


// LOAD INTERFACES -> Dispatch success and stations loads
const locateLoad = ( action$, { getState }, { wsAPI } ) =>
	action$.ofType(...[LOCATION_LOAD,LOCATION_CHANGE_SUCCESS])
		.mergeMap(() => getLocation(wsAPI, getState().meta.sid))
		.map((payload) => ({ type: LOCATION_LOAD_SUCCESS, payload }));

const locateChange = ( action$, { getState }, { wsAPI } ) =>
	action$.ofType(LOCATION_CHANGE)
		.mergeMap((action) => changeLocation(wsAPI, getState().meta.sid, action.payload))
		.map((payload) => ({ type: LOCATION_CHANGE_SUCCESS }));

export default { locateLoad, locateChange };