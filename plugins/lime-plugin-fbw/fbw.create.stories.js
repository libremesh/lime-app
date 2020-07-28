/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';

import { NetworkForm } from './src/containers/NetworkForm';

storiesOf('Containers|First boot wizard', module)
	
	.add('Create a new network', () => (
		<NetworkForm
			createNetwork={action('createNetwork')}
			toggleForm={(data) => () => action('toggleForm')(data)}
		/>
	));
