import {
	FBW_SEARCH_NETWORKS_SUCCESS, FBW_SEARCH_NETWORKS_ERROR, FBW_CREATE_NETWORK_SUCCESS, FBW_CREATE_NETWORK_ERROR, FBW_SET_NETWORK_SUCCESS, FBW_SET_NETWORK_ERROR, FBW_STATUS_SUCCESS
} from './constants';

export const initialState = {
	first_boot: false,
	networks: [],
	status: null
};

export const reducer = (state = initialState, { type, payload, meta }) => {
	switch (type) {
		case FBW_STATUS_SUCCESS:
			return {
				...state,
				first_boot: payload.lock
			};
		case FBW_SEARCH_NETWORKS_SUCCESS:
			return {
				...state,
				networks: payload.networks || [],
				status: payload.status || null
			};

		case FBW_SEARCH_NETWORKS_ERROR:
			return {
				...state,
				status: 'error'
			};
		case FBW_CREATE_NETWORK_SUCCESS:
			return {
				...initialState
			};
		case FBW_CREATE_NETWORK_ERROR:
			return {
				...state,
				status: 'error'
			};
		case FBW_SET_NETWORK_SUCCESS:
			return {
				...initialState
			};
		case FBW_SET_NETWORK_ERROR:
			return {
				...state,
				status: 'error'
			};

		default:
			return state;
	}
};
