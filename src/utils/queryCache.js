import { QueryCache } from 'react-query';

const queryCache = new QueryCache({
	defaultConfig: {
		queries: {
			staleTime: Infinity,
			refetchOnMount: false,
			retry: 0
		}
	}
});

export default queryCache;
