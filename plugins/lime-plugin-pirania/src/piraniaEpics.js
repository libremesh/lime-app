import { getGovernance, getVoucherList, addMemberVoucher, addVisitorVoucher } from './piraniaApi';
import {
	LOAD_GOVERNANCE, LOAD_GOVERNANCE_SUCCESS, LOAD_GOVERNANCE_ERROR,
	LOAD_VOUCHERS, LOAD_VOUCHERS_SUCCESS, LOAD_VOUCHERS_ERROR,
	CREATE_MEMBER_VOUCHER, CREATE_MEMBER_VOUCHER_SUCCESS, CREATE_MEMBER_VOUCHER_ERROR,
	CREATE_VISITOR_VOUCHER, CREATE_VISITOR_VOUCHER_SUCCESS, CREATE_VISITOR_VOUCHER_ERROR
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
				return [
					{ type: LOAD_GOVERNANCE_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
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
				return [
					{ type: LOAD_VOUCHERS_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: LOAD_VOUCHERS_SUCCESS, payload }];
		})
		.catch([{ type: LOAD_VOUCHERS_ERROR }]);

const createMemberVoucher = (action$, store, { wsAPI }) =>
	action$
		.ofType(CREATE_MEMBER_VOUCHER)
		.mergeMap(action => addMemberVoucher(wsAPI, store.value.admin.sid, action.payload))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: CREATE_MEMBER_VOUCHER_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: CREATE_MEMBER_VOUCHER_SUCCESS, payload }];
		})
		.catch([{ type: CREATE_MEMBER_VOUCHER_ERROR }]);

const createVisitorVoucher = (action$, store, { wsAPI }) =>
	action$
		.ofType(CREATE_VISITOR_VOUCHER)
		.mergeMap(action => addVisitorVoucher(wsAPI, store.value.admin.sid, action.payload))
		.mergeMap(payload => {
			console.log('payload', payload)
			if (payload.code) {
				return [
					{ type: CREATE_VISITOR_VOUCHER_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: CREATE_VISITOR_VOUCHER_SUCCESS, payload }];
		})
		.catch([{ type: CREATE_VISITOR_VOUCHER_ERROR }]);


export default { loadGovernance, loadVoucherList, createMemberVoucher, createVisitorVoucher };
