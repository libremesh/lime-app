import { h } from 'preact';

import I18n from 'i18n-js';

export const Menu = () => (
	<a href={'#/notes'}>{I18n.t('Notes')}</a>
);