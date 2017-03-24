import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'

import { 
    LOCATION_LOAD,
    LOCATION_LOAD_SUCCESS,
    LOCATION_CHANGE,
    LOCATION_CHANGE_SUCCESS
} from '../actions/ActionTypes';


// LOAD INTERFACES -> Dispatch success and stations loads
export const locateLoad = ( action$, { getState } ) => 
    action$.ofType(...[LOCATION_LOAD,LOCATION_CHANGE_SUCCESS])
        .mergeMap(() => window.wsAPI.getLocation(getState().meta.sid))
            .map((payload) => ({ type: LOCATION_LOAD_SUCCESS, payload: payload }));

export const locateChange = ( action$, { getState } ) => 
    action$.ofType(LOCATION_CHANGE)
        .mergeMap((action) => window.wsAPI.changeLocation(getState().meta.sid, action.payload))
            .map((payload) => ({ type: LOCATION_CHANGE_SUCCESS }));
