import {
	RELOAD_CONFIG,
	AUTH_LOGIN_SUCCESS,
	SET_CONFIG,
	SET_CONFIG_ERROR,
	GET_CONFIG,
	GET_CONFIG_ERROR,
	GET_CONFIG_SUCCESS
} from './adminConstants';

export const initialState = {
	sid: '00000000000000000000000000000000',
	auth: false,
	hostname: '',
	loading: false
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case RELOAD_CONFIG:
			return Object.assign({}, initialState);
		case AUTH_LOGIN_SUCCESS:
			return Object.assign({}, state, { sid: payload, auth: true });
		case SET_CONFIG:
			return Object.assign({}, state, { hostname: payload.hostname, loading: true });
		case GET_CONFIG:
			return Object.assign({}, state, { loading: true });
		case GET_CONFIG_SUCCESS:
			return Object.assign({}, state, { configs: payload, loading: false });
		case GET_CONFIG_ERROR:
			return Object.assign({}, state, { loading: false });
		case SET_CONFIG_ERROR:
			return Object.assign({}, state, { loading: false });
		default:
			return state;
	}
};
