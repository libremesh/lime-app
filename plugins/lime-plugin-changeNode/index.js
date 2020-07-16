import epics from './src/changeNodeEpics';
import { reducer } from './src/changeNodeReducer';
import * as selector from './src/changeNodeSelectors';
import * as constants from './src/changeNodeConstants';
import ChangeNode from './src/changeNodePage';
import { ChangeNodeMenu } from './src/changeNodeMenu';

export default {
	name: 'changeNode',
	page: ChangeNode,
	menu: ChangeNodeMenu,
	store: {
		name: 'changeNode',
		epics,
		reducer,
		selector,
		constants
	}
};
