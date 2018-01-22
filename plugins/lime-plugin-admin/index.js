import  epics from './src/adminEpics';
import { reducer } from './src/adminReducer';
import * as selector from './src/adminSelectors';
import * as constants from './src/adminConstants';
import Admin from './src/adminPage';
import { AdminMenu } from './src/adminMenu';

export default {
	name: 'Admin',
	page: Admin,
	menu: AdminMenu,
	store: {
		name: 'admin',
		epics,
		reducer,
		selector,
		constants
	}
};
