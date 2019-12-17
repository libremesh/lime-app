/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';

import { Header } from '../../src/components/header';
import 'skeleton-less/less/skeleton';
import '../../src/style';

export const actions = {
	onMenuOpen: action('onMenuToggle')
};
const FakeDrawer = ({ status, toggle }) => {
	const [init, setInit]  = useState(true);
	useEffect(() => {
		if (!init) {
			actions.onMenuOpen(status);
		}
		setInit(x => false);
	}, [status]);
};

storiesOf('Header', module)
	.add('hidden menu', () => <Header hostname="ql-anaymarcos"	menuHidden	Drawer={FakeDrawer} />)
	.add('with menu icon', () => <Header hostname="ql-anaymarcos" Drawer={FakeDrawer} />);