import { h } from 'preact';
import { ReactQueryCacheProvider } from 'react-query';
import { render as tlRender } from '@testing-library/preact';
import queryCache from 'utils/queryCache';
import SubHeader from '../containers/SubHeader';
import i18n from '../i18n';
import { I18nProvider } from '@lingui/react';

i18n.activate('en');

export const render = (ui) => tlRender(
	<I18nProvider i18n={i18n}>
		<ReactQueryCacheProvider queryCache={queryCache}>
			<SubHeader />
			{ui}
		</ReactQueryCacheProvider>
	</I18nProvider>
)
