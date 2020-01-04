import { getActiveVouchers,
	getStatus,
	getGovernance,
	getVoucherList,
	getContent,
	runEnable,
	runDisable,
	addMemberVoucher,
	addVisitorVoucher,
	runRenewVouchers,
	runWriteGovernance,
	runWriteContent
} from './piraniaApi';
import {
	LOAD_ACTIVE_VOUCHERS, LOAD_ACTIVE_VOUCHERS_SUCCESS, LOAD_ACTIVE_VOUCHERS_ERROR,
	LOAD_STATUS, LOAD_STATUS_SUCCESS, LOAD_STATUS_ERROR,
	LOAD_GOVERNANCE, LOAD_GOVERNANCE_SUCCESS, LOAD_GOVERNANCE_ERROR,
	LOAD_VOUCHERS, LOAD_VOUCHERS_SUCCESS, LOAD_VOUCHERS_ERROR,
	LOAD_CONTENT, LOAD_CONTENT_SUCCESS, LOAD_CONTENT_ERROR,
	ENABLE, ENABLE_SUCCESS, ENABLE_ERROR,
	DISABLE, DISABLE_SUCCESS, DISABLE_ERROR,
	CREATE_MEMBER_VOUCHER, CREATE_MEMBER_VOUCHER_SUCCESS, CREATE_MEMBER_VOUCHER_ERROR,
	CREATE_VISITOR_VOUCHER, CREATE_VISITOR_VOUCHER_SUCCESS, CREATE_VISITOR_VOUCHER_ERROR,
	RENEW_MEMBER_VOUCHERS, RENEW_MEMBER_VOUCHERS_SUCCESS, RENEW_MEMBER_VOUCHERS_ERROR,
	WRITE_GOVERNANCE, WRITE_GOVERNANCE_SUCCESS, WRITE_GOVERNANCE_ERROR,
	WRITE_CONTENT, WRITE_CONTENT_SUCCESS, WRITE_CONTENT_ERROR
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

const loadStatus = (action$, store, { wsAPI }) =>
	action$
		.ofType(LOAD_STATUS)
		.mergeMap(action => getStatus(wsAPI, store.value.admin.sid, {}))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: LOAD_STATUS_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: LOAD_STATUS_SUCCESS, payload }];
		})
		.catch([
			{ type: LOAD_STATUS_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

const enable = (action$, store, { wsAPI }) =>
	action$
		.ofType(ENABLE)
		.mergeMap(action => runEnable(wsAPI, store.value.admin.sid, {}))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: ENABLE_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: ENABLE_SUCCESS, payload }];
		})
		.catch([
			{ type: ENABLE_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

const disable = (action$, store, { wsAPI }) =>
	action$
		.ofType(DISABLE)
		.mergeMap(action => runDisable(wsAPI, store.value.admin.sid, {}))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: DISABLE_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: DISABLE_SUCCESS, payload }];
		})
		.catch([
			{ type: DISABLE_ERROR },
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

const loadContent = (action$, store, { wsAPI }) =>
	action$
		.ofType(LOAD_CONTENT)
		.mergeMap(action => getContent(wsAPI, store.value.meta.sid, {}))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: LOAD_CONTENT_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: LOAD_CONTENT_SUCCESS, payload }];
		})
		.catch([
			{ type: LOAD_CONTENT_ERROR },
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

const writeGovernance = (action$, store, { wsAPI }) =>
	action$
		.ofType(WRITE_GOVERNANCE)
		.mergeMap(action => runWriteGovernance(wsAPI, store.value.admin.sid, action.payload))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: WRITE_GOVERNANCE_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: WRITE_GOVERNANCE_SUCCESS, payload }];
		})
		.catch([
			{ type: WRITE_GOVERNANCE_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

const writeContent = (action$, store, { wsAPI }) =>
	action$
		.ofType(WRITE_CONTENT)
		.mergeMap(action => runWriteContent(wsAPI, store.value.admin.sid, action.payload))
		.mergeMap(payload => {
			if (payload.code) {
				return [
					{ type: WRITE_CONTENT_ERROR, payload },
					{ type: 'NOTIFICATION', payload: { msg: payload.message } }
				];
			}
			return [{ type: WRITE_CONTENT_SUCCESS, payload }];
		})
		.catch([
			{ type: WRITE_CONTENT_ERROR },
			{ type: 'NOTIFICATION', payload: { msg: 'Error' } }
		]);

export default {
	loadActiveVouchers,
	loadGovernance,
	loadVoucherList,
	loadContent,
	createMemberVoucher,
	createVisitorVoucher,
	renewVouchers,
	loadStatus,
	enable,
	disable,
	writeGovernance,
	writeContent
};
