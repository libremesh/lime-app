import { h } from 'preact';

import I18n from 'i18n-js';

export const MetaMenu = () => (
	<a href={'#/config'}>{I18n.t('Change Node')}</a>
);
