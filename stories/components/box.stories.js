/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import { Box } from '../../src/components/box';
import 'skeleton-less/less/skeleton';
import '../../src/style';
import { Header } from '../../src/components/header';

export default {
	title: 'Box',
	decorators: [withKnobs]
};

const FakeTimer = () => {
	const [ count, setCount ] = useState(0);

	useEffect(() => {
		const interval = setInterval(async () => {
			setCount(prevCount => prevCount + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<span>
			<b>Uptime</b> {new Date(Date.now() + count).toTimeString().split(' ')[0]}<br />
		</span>
	);
};

export const basicBox = () =>
	(<div style={{ padding: '20px' }}>
		<Box title={text('Title', 'Some title')} collapse={boolean('Collapse', false)} collapsed={boolean('Collapsed', false)}>
			{text('Childern content','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.') }
		</Box>
	</div>);
    
export const boxInSomeContext = () => (
	<div>
		<Header hostname="ql-anaymarcos" />
		<div style={{ padding: '80px 20px' }}>
			<Box title={'System uptime'}>
				<FakeTimer />
			</Box>
		</div>
	</div>
);
