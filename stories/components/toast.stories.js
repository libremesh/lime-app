/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';

import Toast from 'components/toast';

const actions = {
	hideToast: action('hide')
};

const sampleInfoText = 'Lorem ipsum dolor sit amet';
const sampleSuccessText = 'Success Lorem ipsum dolor sit amet';
const sampleErrorText = 'Error Lorem ipsum dolor sit amet';

export default {
	title: 'Toast',
	component: Toast
};

export const infoToast = () => (
	<Toast onHide={actions.hideToast} text={text('Info message', sampleInfoText)} />
);

export const successToast = () => (
	<Toast onHide={actions.hideToast} type="success" text={text('Success message', sampleSuccessText) } />
);

export const errorToast = () => (
	<Toast onHide={actions.hideToast} type="error" text={text('Error message', sampleErrorText)} />
);