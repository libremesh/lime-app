import  epics from './src/groundRoutingEpics';
import { reducer } from './src/groundRoutingReducer';
import * as constants from './src/groundRoutingConstants';
import Page from './src/groundRoutingPage';
import { Menu } from './src/groundRoutingMenu';

export default {
	name: 'groundRouting',
	page: Page,
	menu: Menu,
	store: {
		name: 'groundrouting',
		epics,
		reducer,
		constants
	}
};