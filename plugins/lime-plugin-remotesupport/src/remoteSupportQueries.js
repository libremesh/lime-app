import { useQuery, useMutation } from 'react-query';
import queryCache from 'utils/queryCache';
import { getSession, openSession, closeSession } from './remoteSupportApi'


export function useSession(queryConfig) {
	return useQuery(["tmate", "get_session"], getSession, queryConfig);
}

export function useOpenSession() {
	return useMutation(openSession, {
		onSuccess: () => queryCache.invalidateQueries(["tmate", "get_session"])
	})
}

export function useCloseSession() {
	return useMutation(closeSession, {
		onSuccess: () => queryCache.invalidateQueries(["tmate", "get_session"])
	})
}
