/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

import { NetAdmin } from './src/netAdminPage';

const submitSharedPassword = action('setSharedPassword');

storiesOf('Containers/Network Configuration screen', module)
	.add('Change Shared Password', () => (
		<NetAdmin
			submitting={boolean('submitting', false)}
			success={boolean('succees', false)}
			submitSharedPassword={submitSharedPassword}
		/>
	));
