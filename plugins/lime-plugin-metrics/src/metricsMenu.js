import { h } from 'preact';

import I18n from 'i18n-js';

export const MetricsMenu = () => (
	<a href={'#/metrics'}>{I18n.t('Metrics')}</a>
);