import { useQuery, useMutation } from 'react-query';
import queryCache from 'utils/queryCache';
import { dismissFbw, createNetwork, setNetwork, scanStart, scanStatus, scanRestart, scanStop, getFbwStatus }
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
	let getHostname = /(?<=host__)(.+)(?=__)/;
	let hostname = getHostname.exec(file)[1];
	return `${  ap && ap !== ''}`? `(${ap}) ${ hostname}` : hostname;
};

const _getBssid = ({ file = '' }) => {
	let bssid = file.split("__").pop(); 
	return bssid;
};


export function useScanStart(params) {
	return useMutation(
		async () => (await scanStart())['result'], params)
}

export function useScanRestart(params) {
	return useMutation(
		async () => (await scanRestart())['result'], params)

}

export function useScanStop(params) {
	return useMutation(
		async () => (await scanStop())['result'], params)
}

async function _scanStatus() {
	let payload = await scanStatus()
	return {
		scanned: payload.scanned || [],
		networks: payload.networks.map(net => ({
			...net,
			ap: _getApName(net),
			bssid: _getBssid(net)
		})) || [],
		status: payload.status || null
	};
}

export function useScanStatus(params) {
	return useQuery(['lime-fbw', 'scan-status'], _scanStatus, params)
}


export function useSetNetwork(params) {
	return useMutation(setNetwork, params);
}
