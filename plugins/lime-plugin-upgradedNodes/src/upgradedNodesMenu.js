import { h } from 'preact';
import I18n from 'i18n-js';

const Menu = () => (
	<a href={'#/upgradednodes'}>{I18n.t('Upgraded Nodes')}</a>
);

export default Menu;
