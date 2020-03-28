/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import 'skeleton-less/less/skeleton';
import '../../src/style';
import { Input } from '../../src/components/input';

export default {
	title: 'Input',
	decorators: [withKnobs]
};

export const input = () => (
	<div style={{ padding: '20px' }}>
		<Input
			type={'text'}
			label={text('Lable','Input Component')}
			value={text('Value', '')}
			onChange={action('onChange')}
			width={text('Width','300px')}
			onClick={action('onClick')}
			accept={text('Input accept')}
		/>
	</div>
);


export const textarea = () => (
	<div style={{ padding: '20px' }}>
		<Input
			type={'textarea'}
			label={text('Lable','Input Component')}
			value={text('Value', '')}
			onChange={action('onChange')}
			width={text('Width','300px')}
			onClick={action('onClick')}
			accept={text('Input accept')}
		/>
	</div>
);
