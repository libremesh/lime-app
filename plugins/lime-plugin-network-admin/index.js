import  epics from './src/netAdminEpics';
import { reducer } from './src/netAdminReducer';
import * as constants from './src/netAdminConstants';
import * as selector from './src/netAdminSelectors';
import NetAdmin from './src/netAdminPage';
import { NetAdminMenu } from './src/netAdminMenu';

export default {
	name: 'NetAdmin',
	page: NetAdmin,
	menu: NetAdminMenu,
	store: {
		name: 'netAdmin',
		epics,
		reducer,
		constants,
		selector
	}
};
