import { h } from 'preact';

import I18n from 'i18n-js';

export const NetAdminMenu = () => (
	<a href='#/netadmin'>{I18n.t('Network Configuration')}</a>
);
