/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { text, boolean } from '@storybook/addon-knobs';

import { Page } from './src/notesPage';

const actions = {
	getNotes: action('getNotes'),
	setNotes: action('setNotes')
};

export default {
	title: 'Containers/Notes',
	component: Page
};

export const manageNote = () => (
	<Page
		notes={text('Note','This node works great')}
		loading={boolean('Loading', false)}
		{...actions}
	/>
);
