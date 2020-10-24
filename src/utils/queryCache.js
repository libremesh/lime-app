import { QueryCache, setConsole } from 'react-query';

setConsole({
	log: () => {},
	warn: () => {},
	error: () => {}
})

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
