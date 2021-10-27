import { h } from 'preact';
import { ReactQueryCacheProvider } from 'react-query';
import { render as tlRender } from '@testing-library/preact';
import queryCache from 'utils/queryCache';
import SubHeader from '../containers/SubHeader';

export const render = (ui) => tlRender(
	<ReactQueryCacheProvider queryCache={queryCache}>
		<SubHeader />
		{ui}
	</ReactQueryCacheProvider>
)
