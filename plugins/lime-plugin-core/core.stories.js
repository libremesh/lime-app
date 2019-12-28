import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, text } from '@storybook/addon-knobs/react';

import { frameDecorator } from '../../.storybook/frameDecorator';
import { Meta } from './src/metaPage';

export const actions = {
	changeBase: action('changeBase')
};

storiesOf('Containers|Configuration screen (meta)', module)
	.addDecorator(withKnobs)
	.addDecorator(frameDecorator)
	.add('Config screeen', () => (
		<Meta
			selectedHost={text('Selected host', 'ql-anaymarcos')}
			base={text('Base host', 'ql-anaymarcos')}
			stations={array('Mesh hosts',[
				'ql-anaymarcos',
				'ql-graciela',
				'ql-czuk-bbone'
			])}
			{...actions}
		/>
	));