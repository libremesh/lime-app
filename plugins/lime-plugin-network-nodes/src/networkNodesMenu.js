import { h } from 'preact';
import I18n from 'i18n-js';

const Menu = () => (
	<a href={'#/networknodes'}>{I18n.t('Network Nodes')}</a>
);

export default Menu;
