import {
	SET_HOSTNAME,
	SET_HOSTNAME_ERROR,
	SET_HOSTNAME_SUCCESS
} from './adminConstants';

export const initialState = {
	hostname: '',
	loading: false,
	redirect: false,
	error: false
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_HOSTNAME:
			return Object.assign({}, state, { hostname: payload, loading: true });
		case SET_HOSTNAME_ERROR:
			return Object.assign({}, state, { loading: false, error: true });
		case SET_HOSTNAME_SUCCESS:
			return Object.assign({}, state, { redirect: true });
		default:
			return state;
	}
};
