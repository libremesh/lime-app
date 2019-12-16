import {
	FBW_SEARCH_NETWORKS_SUCCESS,
	FBW_SEARCH_NETWORKS_ERROR,
	FBW_CREATE_NETWORK,
	FBW_CREATE_NETWORK_ERROR,
	FBW_SET_NETWORK,
	FBW_SET_NETWORK_ERROR,
	FBW_STATUS_SUCCESS
} from './constants';

export const initialState = {
	first_boot: false,
	networks: [],
	status: null,
	expectedHost: null,
	expectedNetwork: null
};

const getApName = ({ ap = '', file = '' }) => {
	let getHostname = /(?:host__)(.+)/;
	let hostname = getHostname.exec(file)[1];
	return '' + (ap && ap !== '')? '('+ap+') '+ hostname : hostname;
};

// const getApName = ({ ap = '', file = '' }) => {
// 	let getHostname = /(?:__ssid__)(.+)(?:__host__)/;
// 	return '' + (ap && ap !== '')? '('+ap+') ': '' + getHostname.exec(file)[1];
// };

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
				networks: payload.networks.map(net => ({
					...net,
					ap: getApName(net)
				})) || [],
				status: payload.status || null
			};

		case FBW_SEARCH_NETWORKS_ERROR:
			return {
				...state,
				status: 'error'
			};
		case FBW_CREATE_NETWORK_ERROR:
			return {
				...state,
				status: 'error'
			};
		case FBW_SET_NETWORK_ERROR:
			return {
				...state,
				status: 'error'
			};
		case FBW_CREATE_NETWORK:
		case FBW_SET_NETWORK:
			return {
				...state,
				expectedHost: payload.hostname,
				expectedNetwork: payload.network
			};
		default:
			return state;
	}
};
