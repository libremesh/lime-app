import { getGovernance, getVoucherList } from './piraniaApi';
import {
	LOAD_GOVERNANCE,
	LOAD_GOVERNANCE_SUCCESS,
	LOAD_GOVERNANCE_ERROR,
	LOAD_VOUCHERS,
	LOAD_VOUCHERS_SUCCESS,
	LOAD_VOUCHERS_ERROR
} from './piraniaConstants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/mergeMap';

const loadGovernance = (action$, store, { wsAPI }) =>
	action$
		.ofType(LOAD_GOVERNANCE)
		.mergeMap(action => getGovernance(wsAPI, store.value.meta.sid, {}))
		.mergeMap(payload => {
			if (payload.code) {
				return [{ type: LOAD_GOVERNANCE_ERROR, payload }];
			}
			return [{ type: LOAD_GOVERNANCE_SUCCESS, payload }];
		})
		.catch([{ type: LOAD_GOVERNANCE_ERROR }]);

const loadVoucherList = (action$, store, { wsAPI }) =>
	action$
		.ofType(LOAD_VOUCHERS)
		.mergeMap(action => getVoucherList(wsAPI, store.value.admin.sid, {}))
		.mergeMap(payload => {
			if (payload.code) {
				return [{ type: LOAD_VOUCHERS_ERROR, payload }];
			}
			return [{ type: LOAD_VOUCHERS_SUCCESS, payload }];
		})
		.catch([{ type: LOAD_VOUCHERS_ERROR }]);
export default { loadGovernance, loadVoucherList };
