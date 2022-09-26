import { QueryClient } from '@tanstack/react-query'

const queryCache = new QueryClient({
	defaultConfig: {
		queries: {
			staleTime: Infinity,
			refetchOnMount: false,
			retry: 0
		}
	}
});

export default queryCache;
