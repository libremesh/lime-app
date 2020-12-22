import { useQuery, useMutation } from 'react-query';
import queryCache from 'utils/queryCache';
import { getSession, openSession, closeSession } from './remoteSupportApi'


export function useSession() {
	return useQuery(["lime-remotesupport", "get_session"], getSession, {
		refetchInterval: 10000
	});
}

export function useOpenSession() {
	return useMutation(openSession, {
		onSuccess: () => queryCache.invalidateQueries(["lime-remotesupport", "get_session"])
	})
}

export function useCloseSession() {
	return useMutation(closeSession, {
		onSuccess: () => queryCache.invalidateQueries(["lime-remotesupport", "get_session"])
	})
}
