import { getGovernance } from './piraniaApi';
import {
	LOAD_GOVERNANCE,
	LOAD_GOVERNANCE_SUCCESS,
	LOAD_GOVERNANCE_ERROR,
} from './piraniaConstants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/mergeMap';

const loadGovernance = ( action$, store, { wsAPI }) =>
	action$.ofType(LOAD_GOVERNANCE)
		.mergeMap((action) => getGovernance(wsAPI,store.value.meta.sid, {}))
		.mergeMap(payload => {
			if (payload.code) {
				return [{ type: LOAD_GOVERNANCE_ERROR, payload }]; 
			}
			return [{ type: LOAD_GOVERNANCE_SUCCESS, payload }];
		})
		.catch([({ type: LOAD_GOVERNANCE_ERROR })]);

export default { loadGovernance };