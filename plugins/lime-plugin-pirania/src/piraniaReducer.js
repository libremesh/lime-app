import {
	LOAD_GOVERNANCE, LOAD_GOVERNANCE_SUCCESS, LOAD_GOVERNANCE_ERROR,
	LOAD_VOUCHERS, LOAD_VOUCHERS_SUCCESS, LOAD_VOUCHERS_ERROR,
} from './piraniaConstants';

export const initialState = {
	governance: null,
	loading: false,
	vouchers: null,
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOAD_GOVERNANCE:
			return Object.assign({}, state, { loading: true });
		case LOAD_GOVERNANCE_SUCCESS:
			return Object.assign({}, state, { governance: payload, loading: false });
		case LOAD_GOVERNANCE_ERROR:
			return Object.assign({}, state, { governance: { error: payload.message }, loading: false });
		case LOAD_VOUCHERS:
			return Object.assign({}, state, { loading: true });
		case LOAD_VOUCHERS_SUCCESS:
			return Object.assign({}, state, { vouchers: payload.vouchers, loading: false });
		case LOAD_VOUCHERS_ERROR:
			return Object.assign({}, state, { vouchers: { error: payload.message }, loading: false });
		default:
			return state;
	}
};
