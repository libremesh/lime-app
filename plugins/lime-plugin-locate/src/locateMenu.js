import { h } from 'preact';

import I18n from 'i18n-js';

export const LocateMenu = () => (
	<a href={'#/locate'}>{I18n.t('Locate')}</a>
);