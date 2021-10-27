import { h } from 'preact';
import I18n from 'i18n-js';

const Menu = () => (
	<a href={'/nodeadmin'}>{I18n.t('Node Configuration')}</a>
);

export default Menu;
