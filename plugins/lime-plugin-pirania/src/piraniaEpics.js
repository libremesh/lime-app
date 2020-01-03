import { getActiveVouchers, getGovernance, getVoucherList, addMemberVoucher, addVisitorVoucher, runRenewVouchers } from './piraniaApi';
import {
	LOAD_ACTIVE_VOUCHERS, LOAD_ACTIVE_VOUCHERS_SUCCESS, LOAD_ACTIVE_VOUCHERS_ERROR,
	LOAD_GOVERNANCE, LOAD_GOVERNANCE_SUCCESS, LOAD_GOVERNANCE_ERROR,
	LOAD_VOUCHERS, LOAD_VOUCHERS_SUCCESS, LOAD_VOUCHERS_ERROR,
	CREATE_MEMBER_VOUCHER, CREATE_MEMBER_VOUCHER_SUCCESS, CREATE_MEMBER_VOUCHER_ERROR,
	CREATE_VISITOR_VOUCHER, CREATE_VISITOR_VOUCHER_SUCCESS, CREATE_VISITOR_VOUCHER_ERROR,
	RENEW_MEMBER_VOUCHERS, RENEW_MEMBER_VOUCHERS_SUCCESS, RENEW_MEMBER_VOUCHERS_ERROR
} from './piraniaConstants';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/mergeMap';

const loadActiveVouchers = (action$, store, { wsAPI }) =>
	action$
		.ofType(LOAD_ACTIVE_VOUCHERS)
		.mergeMap(action => getActiveVouchers(wsAPI, store.value.meta.sid, {}))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: LOAD_ACTIVE_VOUCHERS_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: LOAD_ACTIVE_VOUCHERS_SUCCESS, payload }];
		})
		.catch([
			{ type: LOAD_ACTIVE_VOUCHERS_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);


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
		.catch([
			{ type: LOAD_GOVERNANCE_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

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
		.catch([
			{ type: LOAD_VOUCHERS_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

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
		.catch([
			{ type: CREATE_MEMBER_VOUCHER_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

const createVisitorVoucher = (action$, store, { wsAPI }) =>
	action$
		.ofType(CREATE_VISITOR_VOUCHER)
		.mergeMap(action => addVisitorVoucher(wsAPI, store.value.admin.sid, action.payload))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: CREATE_VISITOR_VOUCHER_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: CREATE_VISITOR_VOUCHER_SUCCESS, payload }];
		})
		.catch([
			{ type: CREATE_VISITOR_VOUCHER_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

const renewVouchers = (action$, store, { wsAPI }) =>
	action$
		.ofType(RENEW_MEMBER_VOUCHERS)
		.mergeMap(action => runRenewVouchers(wsAPI, store.value.admin.sid, action.payload))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: RENEW_MEMBER_VOUCHERS_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: RENEW_MEMBER_VOUCHERS_SUCCESS, payload }];
		})
		.catch([
			{ type: RENEW_MEMBER_VOUCHERS_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

export default { loadActiveVouchers, loadGovernance, loadVoucherList, createMemberVoucher, createVisitorVoucher, renewVouchers };
