import { h } from 'preact';

import I18n from 'i18n-js';

export const AdminMenu = () => (
	<a href={'#/admin'}>{I18n.t('Admin')}</a>
);