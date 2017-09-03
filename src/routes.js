import { h } from 'preact';

import { plugins } from './config';

export const Navs = () => {
	const menuItems = plugins
		.filter( plugin => plugin.page !== false)
		.map( plugin => <plugin.menu />);
	return (<nav>{menuItems}</nav>);
};