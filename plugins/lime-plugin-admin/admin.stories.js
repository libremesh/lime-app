/* eslint-disable react/display-name */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, text } from '@storybook/addon-knobs/react';

import { Admin } from './src/adminPage';
import { AppContext } from '../../src/utils/app.context';

const actions = {
	changeConfig: action('changeConfig')
};

export default {
	title: 'Containers|Admin',
	component: Admin,
	decorators: [withKnobs]
};

const nodeHostname = text('nodeHostname', 'ql-anaymarcos');
const changeNode = action('changeNode');

export const configForm = () => {
	const appContext = { nodeHostname, changeNode };
	return (
		<AppContext.Provider value={appContext}>
			<Admin
				nodeData={object('Node data', {
					ips: [{
						version: '4',
						address: '10.5.0.4'
					}]
				})}
				loading={false}
				{...actions}
			/>
		</AppContext.Provider>);
};

export const waitingForChanges = () => {
	const appContext = { nodeHostname, changeNode };
	return (
		<AppContext.Provider value={appContext}>
			<Admin
				nodeData={object('Node data', {
					ips: [{
						version: '4',
						address: '10.5.0.4'
					}]
				})}
				loading
				{...actions}
			/>
		</AppContext.Provider>
	);
};

