/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';

import { Header } from 'components/header';
import { Menu } from '../../src/containers/Menu';
import { AppContext } from 'utils/app.context';
import { boolean } from '@storybook/addon-knobs';

const menuEnabled = boolean('menuEnabled', true);

export default {
	title: 'Header',
	component: Header
};

export const withMenuDisabled = () => (
	<AppContext.Provider value={{ menuEnabled: !menuEnabled }}>
		<Header Menu={Menu} />
	</AppContext.Provider>
);

export const withMenuEnabled = () => (
	<AppContext.Provider value={{ menuEnabled }}>
		<Header Menu={Menu} />
	</AppContext.Provider>
);
