import { h } from 'preact';

import { plugins } from './config';

export const Navs = () => {
	const menuItems = plugins
		.filter( plugin => plugin.page !== false )
		.map( plugin => plugin.menu)
		.filter( plugin => plugin);
	return (<nav>{menuItems.map(
		(Item, index) => <Item key={index} />
	)}</nav>);
};