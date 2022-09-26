import { useQuery, useMutation } from '@tanstack/react-query';
import queryCache from 'utils/queryCache';
import { dismissFbw, getFbwStatus, createNetwork, searchNetworks, setNetwork }
	from './FbwApi';

export function useDismissFbw() {
	return useMutation(dismissFbw, {
		onSuccess: () => queryCache.setQueryData(['lime-fbw', 'status'], {lock: false})
	});
}

export function useFbwStatus() {
	return useQuery(['lime-fbw', 'status'], getFbwStatus, {
		initialData: {lock: false},
		initialStale: true
	});
}

export function useCreateNetwork(params) {
	return useMutation(createNetwork, params);
}


const _getApName = ({ ap = '', file = '' }) => {
	let getHostname = /(?:host__)(.+)/;
	let hostname = getHostname.exec(file)[1];
	return `${  ap && ap !== ''}`? `(${ap}) ${ hostname}` : hostname;
};

async function _searchNetworks(rescan) {
	let payload = await searchNetworks(rescan)
	return {
		networks: payload.networks.map(net => ({
			...net,
			ap: _getApName(net)
		})) || [],
		status: payload.status || null
	};
}

export function useSearchNetworks(params) {
	return useMutation( async (rescan) => await _searchNetworks(rescan), {
		onSuccess: (payload) => {
			queryCache.setQueryData(
				['lime-fbw', 'search-networks'],
				payload
			)
		},
		...params});
}

export function useGetNetworks(params) {
	return useQuery(['lime-fbw', 'search-networks'], async () => await _searchNetworks(false), params)
}


export function useSetNetwork(params) {
	return useMutation(setNetwork, params);
}
