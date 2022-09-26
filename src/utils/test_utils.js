import { h } from 'preact';
import { QueryClientProvider } from '@tanstack/react-query';
import { render as tlRender } from '@testing-library/preact';
import queryCache from 'utils/queryCache';
import SubHeader from '../containers/SubHeader';
import i18n, { dynamicActivate } from '../i18n';
import { I18nProvider } from '@lingui/react';

dynamicActivate('en');

export const render = (ui) => tlRender(
	<I18nProvider i18n={i18n}>
		<QueryClientProvider client={queryCache}>
			<SubHeader />
			{ui}
		</QueryClientProvider>
	</I18nProvider>
)

export const flushPromises = () =>
	// Flush all pending resolved promise handlers.
	// Usefull when testing some scenarios with async tasks.  
	new Promise(resolve => setImmediate(resolve));
