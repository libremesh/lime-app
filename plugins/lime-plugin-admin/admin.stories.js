import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, text, boolean } from '@storybook/addon-knobs/react';

import { frameDecorator } from '../../.storybook/frameDecorator';
import { Admin } from './src/adminPage';

export const actions = {
	changeConfig: action('changeConfig'),
	adminLogin: action('adminLogin'),
	showNotification: action('showNotificatio')
};

storiesOf('Containers|Admin screen', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('Ask for password', () => (
		<Admin
			selectedHost={text('Selected host', 'ql-anaymarcos')}
			nodeData={object('Node data', {
				ips: [{
					version: '4',
					address: '10.5.0.4'
				}]
			})}
			authStatus={boolean('Auth status',false)}
			loading={false}
			{...actions}
		/>
	))
	.add('Config form', () => (
		<Admin
			selectedHost={text('Selected host', 'ql-anaymarcos')}
			nodeData={object('Node data', {
				ips: [{
					version: '4',
					address: '10.5.0.4'
				}]
			})}
			authStatus={boolean('Auth status',true)}
			loading={false}
			{...actions}
		/>
	))
	.add('Waiting for changes', () => (
		<Admin
			selectedHost={text('Selected host', 'ql-anaymarcos')}
			nodeData={object('Node data', {
				ips: [{
					version: '4',
					address: '10.5.0.4'
				}]
			})}
			authStatus={boolean('Auth status',true)}
			loading
			{...actions}
		/>
	));