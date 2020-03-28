/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { Page } from './src/notesPage';
import { frameDecorator } from '../../.storybook/frameDecorator';

export const actions = {
	getNotes: action('getNotes'),
	setNotes: action('setNotes')
};

storiesOf('Containers|Notes', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('manage note', () => (
		<Page
			hostname={text('Hostname', 'ql-anaymarcos')}
			notes={text('Note','This node works great')}
			loading={boolean('Loading', false)}
			{...actions}
		/>
	));