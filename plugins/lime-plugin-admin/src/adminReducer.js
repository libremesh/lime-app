import {
	RELOAD_CONFIG,
	SET_CONFIG,
	SET_CONFIG_ERROR,
	SET_CONFIG_SUCCESS
} from './adminConstants';

export const initialState = {
	hostname: '',
	loading: false,
	redirect: false,
	error: false
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case RELOAD_CONFIG:
			return Object.assign({}, initialState);
		case SET_CONFIG:
			return Object.assign({}, state, { hostname: payload.hostname, loading: true });
		case SET_CONFIG_ERROR:
			return Object.assign({}, state, { loading: false, error: true });
		case SET_CONFIG_SUCCESS:
			return Object.assign({}, state, { redirect: true });
		default:
			return state;
	}
};
