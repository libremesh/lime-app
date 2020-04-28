import {
	INIT_NET_ADMIN
} from './netAdminConstants';

export const initNetAdmin = () => {
	console.log('Action called')
	return ({
		type: INIT_NET_ADMIN,
		payload: {}
	})
}
