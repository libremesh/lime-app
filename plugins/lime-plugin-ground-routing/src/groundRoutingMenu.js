import { h } from 'preact';

import I18n from 'i18n-js';

export const Menu = () => (
	<a href={'#/groundrouting'}>{I18n.t('Ground Routing')}</a>
);