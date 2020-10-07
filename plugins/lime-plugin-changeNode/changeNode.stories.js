import { h } from 'preact';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, text } from '@storybook/addon-knobs/react';

import { ChangeNode } from './src/changeNodePage';
import { AppContext } from 'utils/app.context';

const actions = {
	loadStations: action('loadStations')
};

const nodeHostname = text('Node hostname', 'ql-anaymarcos');
const baseNodeHostname = text('Base host', 'ql-anaymarcos')
const changeNode = action('changeNode');

export default {
	title: 'Containers|ChangeNode',
	component: ChangeNode,
	decorators: [withKnobs]
};


export const changeNodeScreen = () => (
	<AppContext.Provider value={{ nodeHostname, baseNodeHostname, changeNode}}>
		<ChangeNode
			stations={array('Mesh hosts',[
				'ql-anaymarcos',
				'ql-graciela',
				'ql-czuk-bbone'
			])}
			{...actions}
		/>
	</AppContext.Provider>
);
