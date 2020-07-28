/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';

import { SelectAction } from './src/containers/SelectAction';

storiesOf('Containers|First boot wizard', module)
	
	.add('Choose an option', () => (
		<SelectAction
			toggleForm={(data) => () => action('toggleForm')(data)}
		/>
	));
