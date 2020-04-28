import {
	INIT_NET_ADMIN_API
} from './netAdminConstants';

export const initialState = {
	api: null,
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case INIT_NET_ADMIN_API:
			console.log(payload);
			return Object.assign({}, state, { api: payload.api });
		default:
			console.log(type);
			return state;
	}
};
