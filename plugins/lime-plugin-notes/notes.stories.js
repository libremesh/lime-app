/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react';

import { Page } from './src/notesPage';
import { AppContext } from 'utils/app.context';

const actions = {
	getNotes: action('getNotes'),
	setNotes: action('setNotes')
};

const nodeHostname = text('Hostname', 'ql-anaymarcos');

export default {
	title: 'Containers|Notes',
	component: Page,
	decorators: [withKnobs]
};

export const manageNote = () => (
	<AppContext.Provider value={{ nodeHostname }}>
		<Page
			notes={text('Note','This node works great')}
			loading={boolean('Loading', false)}
			{...actions}
		/>
	</AppContext.Provider>
);
