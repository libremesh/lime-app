/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import Alert from '../../src/components/alert';

const actions = {
	hideAlert: action('hide')
};

const sampleText = 'Lorem ipsum dolor sit amet';

export default {
	title: 'Alert',
	component: Alert,
	decorators: [withKnobs]
};

export const showAlert = () => (
	<Alert hide={actions.hideAlert} text={text('Alert message', sampleText)} />
);
