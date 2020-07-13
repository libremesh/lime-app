import {
	LOAD_NEIGHBORS,
	LOAD_NEIGHBORS_SUCCESS
} from './metaConstants';

import {
	getCloudNodes
} from './metaApi';

import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';

const loadNetwork = ( action$, _store, { wsAPI }) =>
	action$.pipe(
		ofType(...[LOAD_NEIGHBORS]),
		mergeMap(() => getCloudNodes(wsAPI)),
		map(payload => ({ type: LOAD_NEIGHBORS_SUCCESS, payload }))
	);
 
export default {
	loadNetwork
};
