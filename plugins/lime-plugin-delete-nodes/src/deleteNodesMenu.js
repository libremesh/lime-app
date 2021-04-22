import { h } from 'preact';
import I18n from 'i18n-js';

const Menu = () => (
	<a href={'#/deletenodes'}>{I18n.t('Delete Nodes')}</a>
);

export default Menu;
