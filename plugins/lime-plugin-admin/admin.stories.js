/* eslint-disable react/display-name */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';

import { Admin } from './src/adminPage';

const actions = {
	changeHostname: action('changeHostname')
};

export default {
	title: 'Containers/Admin',
	component: Admin
};

export const configForm = () => <Admin loading={false} {...actions} />

export const waitingForChanges = () => <Admin loading {...actions} />

