/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import { frameDecorator } from '../../.storybook/frameDecorator';
import { NetAdmin } from './src/netAdminPage';

const submitSharedPassword = action('setSharedPassword');

storiesOf('Containers|Network Configuration screen', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('Logged Screen', () => (
		<NetAdmin
			submitting={boolean('submitting', false)}
			success={boolean('succees', false)}
			submitSharedPassword={submitSharedPassword}
		/>
	));
