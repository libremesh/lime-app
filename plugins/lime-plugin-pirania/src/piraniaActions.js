import {
	LOAD_GOVERNANCE,
	LOAD_VOUCHERS,
	CREATE_MEMBER_VOUCHER,
	CREATE_VISITOR_VOUCHER
	// RENEW_MEMBER_VOUCHERS,
	// DELETE_VOUCHER
} from './piraniaConstants';

export const getPiraniaGovernance = () => ({
	type: LOAD_GOVERNANCE
});

export const getVoucherList = () => ({
	type: LOAD_VOUCHERS
});

export const createMemberVoucher = (payload) => ({
	type: CREATE_MEMBER_VOUCHER,
	payload
});

export const createVisitorVoucher = (payload) => ({
	type: CREATE_VISITOR_VOUCHER,
	payload
});
