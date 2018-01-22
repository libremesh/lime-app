import {
	SET_CONFIG,
	AUTH_LOGIN
} from './adminConstants';

export const adminLogin = (credentials) => (dispatch) => {
	dispatch({
		type: AUTH_LOGIN,
		payload: credentials
	});
};

export const changeConfig = (config) => (dispatch) => {
	dispatch({
		type: SET_CONFIG,
		payload: config
	});
};