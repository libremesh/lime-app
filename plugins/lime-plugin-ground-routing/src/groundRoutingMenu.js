import { h } from 'preact';

import I18n from 'i18n-js';

export const Menu = () => (
	<a href={'#/ground-routing'}>{I18n.t('groundRouting')}</a>
);