/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';

import { Header } from '../../src/components/header';
import { Menu } from '../../src/containers/Menu';
import { AppContext } from '../../src/utils/app.context';
import { text, boolean, withKnobs } from '@storybook/addon-knobs/react';

const menuEnabled = boolean('menuEnabled', true);
const nodeHostname = text('nodeHostname', 'ql-anaymarcos');

export default {
	title: 'Header',
	component: Header,
	decorators: [withKnobs]
};

export const withMenuDisabled = () => (
	<AppContext.Provider value={{ nodeHostname, menuEnabled: !menuEnabled }}>
		<Header Menu={Menu} />
	</AppContext.Provider>
);

export const withMenuEnabled = () => (
	<AppContext.Provider value={{ nodeHostname, menuEnabled }}>
		<Header Menu={Menu} />
	</AppContext.Provider>
);
