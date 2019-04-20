import {
	FBW_SEARCH_NETWORKS,
	FBW_SET_NETWORK,
	FBW_CREATE_NETWORK,
	FBW_STATUS
} from './constants';

export const searchNetworks = ( rescan ) => ( dispatch ) => {
	dispatch({
		type: FBW_SEARCH_NETWORKS,
		payload: {
			rescan
		}
	});
};

export const setNetwork = ({ file, network, hostname }) => ( dispatch ) => {
	dispatch({
		type: FBW_SET_NETWORK,
		payload: {
			file,
			network,
			hostname
		}
	});
};

export const createNetwork = ({ network, hostname }) => ( dispatch ) => {
	dispatch({
		type: FBW_CREATE_NETWORK,
		payload: {
			network,
			hostname
		}
	});
};

export const getStatus = () => ( dispatch ) => {
	dispatch({
		type: FBW_STATUS
	});
};