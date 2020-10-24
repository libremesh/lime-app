import { useQuery, useMutation } from 'react-query';
import queryCache from 'utils/queryCache';
import { getFbwStatus } from './api';

export function useFbwStatus() {
	return useQuery(['lime-fbw', 'status'], getFbwStatus, {
		initialData: {lock: false},
		initialStale: true
	});
}
