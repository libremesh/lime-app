/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import 'skeleton-less/less/skeleton';
import '../../src/style';
import { Select } from '../../src/components/select';

export default {
	title: 'Select',
	decorators: [withKnobs]
};

export const select = () => (
	<div style={{ padding: '20px' }}>
		<Select
			text={text('Text','Select box')}
			onChange={action('onChange')}
			checked={boolean('Checked', true)}
			value={text('Value', 'item-selected')}
		/>
	</div>
);
