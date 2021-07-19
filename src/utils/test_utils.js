import { h } from 'preact';
import { ReactQueryCacheProvider } from 'react-query';
import { render as tlRender } from '@testing-library/preact';
import queryCache from 'utils/queryCache';

export const render = (ui) => tlRender(
	<ReactQueryCacheProvider queryCache={queryCache}>
		{ui}
	</ReactQueryCacheProvider>
)

export const flushPromises = async () => 
	new Promise(resolve => setImmediate(resolve));
