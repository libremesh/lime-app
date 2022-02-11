import { useQuery, useMutation } from 'react-query';
import queryCache from 'utils/queryCache';
import { dismissFbw, getFbwStatus, createNetwork } from './api';

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

export function useCreateNetwork() {
	return useMutation(createNetwork);
}

