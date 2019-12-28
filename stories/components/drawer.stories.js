/* eslint-disable react/jsx-no-bind */
import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { Header } from '../../src/components/header';
import { Drawer } from '../../src/components/drawer';
import 'skeleton-less/less/skeleton';
import '../../src/style';

const titles = ['State', 'Location', 'Align', 'Configuration', 'Administration'];

const PopulatedDrower = ({ status, toggle }) => (
	<Drawer status={status} toggle={toggle}>
		<nav>
			{titles.map(title => <a href="#">{title}</a>)}
		</nav>
	</Drawer>
);

storiesOf('Drawer', module)
	.add('opened', () => <PopulatedDrower status="open" />)
	.add('with header', () => <Header hostname="ql-anaymarcos" Drawer={PopulatedDrower} />);
