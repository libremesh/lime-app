import {
	LOAD_GOVERNANCE,
	LOAD_GOVERNANCE_SUCCESS,
	LOAD_GOVERNANCE_ERROR
} from './piraniaConstants';

export const initialState = {
	governance: null,
	loading: false,
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOAD_GOVERNANCE:
			return Object.assign({}, state, { loading: true });
		case LOAD_GOVERNANCE_SUCCESS:
			return Object.assign({}, state, { governance: payload, loading: false });
		case LOAD_GOVERNANCE_ERROR:
			return Object.assign({}, state, { governance: { error: payload.message }, loading: false });
		default:
			return state;
	}
};
