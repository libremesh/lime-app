import {
	SET_CONFIG,
	AUTH_LOGIN
} from './piraniaConstants';


export const adminLogin = (credentials) => ({
	type: AUTH_LOGIN,
	payload: credentials
});