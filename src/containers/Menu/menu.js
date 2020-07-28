import { h } from 'preact';

import { plugins } from '../../config';
import { Drawer } from '../../components/drawer';

export const Menu = ({ opened, toggle }) => (
	<Drawer status={opened} toggle={toggle}>
		<nav>
			{plugins
				.filter(plugin => plugin.page && plugin.menu)
				.map(plugin => plugin.menu)
				.map((Component, index) =>
					<Component key={index} />)
			}
		</nav>
	</Drawer>
);
