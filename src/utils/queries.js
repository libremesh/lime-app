import api from './uhttpd.service';
import {
	getBatHost, getBoardData, getSession, getCommunitySettings, getCommunityName
} from './api';
import { DEFAULT_COMMUNITY_SETTINGS } from './constants';
import { useQuery, useMutation } from 'react-query';
import queryCache from './queryCache';

export function useSession() {
	return useQuery(['session', 'get'], getSession, {
		initialData: {
			username: null
		}
	})
}

function login({ username, password }) {
	return api.login(username, password)
}

export function useLogin() {
	return useMutation(login, {
		onSuccess: res => {
			queryCache.setQueryData(['session', 'get'], () => res.data)
		}
	});
}



export function useBoardData() {
	return useQuery(['system', 'board'], getBoardData, {
		initialData: { hostname: 'LiMe' },
		initialStale: true
	});
}

export function useCommunityName() {
	return useQuery(['lime-utils', 'get_community_name'], getCommunityName, {
		initialData: 'LibreMesh.org',
		initialStale: true
	});
}

export function useCommunitySettings() {
	return useQuery(['lime-utils', 'get_community_settings'], getCommunitySettings, {
		initialData: DEFAULT_COMMUNITY_SETTINGS,
		initialStale: true
	})
}

export function useBatHost(mac, outgoingIface, queryConfig) {
	return useQuery(['bat-hosts', 'get_bathost', mac, outgoingIface], async () => getBatHost(mac, outgoingIface), {
		retry: 3,
		...queryConfig
	});
}
