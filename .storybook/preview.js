import { h } from 'preact';
import '../src/i18nline-glue';
import '../src/style';

import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { addDecorator } from '@storybook/preact';
import { withKnobs } from '@storybook/addon-knobs';

const boarData = {
	hostname: 'ql-anaymarcos',
	release: {
		description: 'LibreRouterOs 1.2-SNAPSHOT r0-21f7665'
	},
	model: 'LibreRouter v1'
};

const DEFAULT_QUERIES = [
	[['system', 'board'], boarData]
]

function queryCacheFactory(queries=[]) {
	const defaultQueries = Object.fromEntries(DEFAULT_QUERIES
		.map(([key, value]) => [JSON.stringify(key), value]))
	const customQueries = Object.fromEntries(queries
		.map(([key, value]) => [JSON.stringify(key), value]))
	const finalQueries = {
		...defaultQueries,
		...customQueries
	}
	const queryCache = new QueryCache({
		defaultConfig: {
			queries: {
				initialStale: Infinity,
				staleTime: Infinity,
				refetchOnMount: false,
				retry: 0
			}
		}
	});
	for (const [key, value] of Object.entries(finalQueries)) {
		queryCache.setQueryData(JSON.parse(key), value)
	}
	return queryCache;
}

const withQueryCache = (Story, context) => (
	<ReactQueryCacheProvider queryCache={queryCacheFactory(context.args.queries)}>
		<Story />
	</ReactQueryCacheProvider>
)
addDecorator(withKnobs);
addDecorator(withQueryCache);
