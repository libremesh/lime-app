/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import { Box } from '../../src/components/box';

export default {
	title: 'Box',
	decorators: [withKnobs]
};

export const basicBox = () =>
	(<div style={{ padding: '20px' }}>
		<Box title={text('Title', 'Some title')}>
			{text('Childern content','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.') }
		</Box>
	</div>);
