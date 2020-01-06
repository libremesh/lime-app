import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, text, boolean } from '@storybook/addon-knobs/react';

import { frameDecorator } from '../../.storybook/frameDecorator';
import Home from './src/pages/home';

export const actions = {
	submit: action('adminLogin')
};

storiesOf('Pirania screen', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('Basic information', () => (
		<Home
			logged="false"
			{...actions}
		/>
	))
	.add('List vouchers', () => (
		<Home
			logged="false"
			{...actions}
		/>
	));