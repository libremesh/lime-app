import {
	SET_CONFIG,
	AUTH_LOGIN
} from './adminConstants';

export const adminLogin = (credentials) => ({
	type: AUTH_LOGIN,
	payload: credentials
});


export const changeConfig = (config) => ({
	type: SET_CONFIG,
	payload: config
});
