import {
	FBW_SEARCH_NETWORKS,
	FBW_SET_NETWORK,
	FBW_CREATE_NETWORK,
	FBW_STATUS
} from './constants';

export const searchNetworks = ( rescan ) => ({
	type: FBW_SEARCH_NETWORKS,
	payload: {
		rescan
	}
});

export const setNetwork = ({ file, network, hostname }) => ({
	type: FBW_SET_NETWORK,
	payload: {
		file,
		network,
		hostname
	}
});

export const createNetwork = ({ network, hostname }) => ({
	type: FBW_CREATE_NETWORK,
	payload: {
		network,
		hostname
	}
});

export const getStatus = () => ({
	type: FBW_STATUS
});
