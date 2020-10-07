/* eslint-disable react/display-name */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import { Admin } from './src/adminPage';
import { AppContext } from 'utils/app.context';

const actions = {
	changeHostname: action('changeHostname')
};

export default {
	title: 'Containers|Admin',
	component: Admin,
	decorators: [withKnobs]
};

const nodeHostname = text('nodeHostname', 'ql-anaymarcos');

export const configForm = () => {
	const appContext = { nodeHostname };
	return (
		<AppContext.Provider value={appContext}>
			<Admin
				loading={false}
				{...actions}
			/>
		</AppContext.Provider>);
};

export const waitingForChanges = () => {
	const appContext = { nodeHostname };
	return (
		<AppContext.Provider value={appContext}>
			<Admin
				loading
				{...actions}
			/>
		</AppContext.Provider>
	);
};

