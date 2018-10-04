import {
	FBW_SEARCH_NETWORKS,
	FBW_SET_NETWORK,
	FBW_CREATE_NETWORK
} from './constants';

export const searchNetworks = ( rescan ) => ( dispatch ) => {
	dispatch({
		type: FBW_SEARCH_NETWORKS,
		payload: {
			rescan
		}
	});
};

export const setNetwork = ( file ) => ( dispatch ) => {
	dispatch({
		type: FBW_SET_NETWORK,
		payload: file
	});
};

export const createNetwork = (network) => (dispatch) => {
	dispatch({
		type: FBW_CREATE_NETWORK,
		payload: network
	});
};