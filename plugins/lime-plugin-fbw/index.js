import  epics from './src/epics';
import { reducer } from './src/reducer';
import * as constants from './src/constants';
import Page from './src/page';

export default {
	name: 'firstbootwizard',
	page: Page,
	store: {
		name: 'firstbootwizard',
		epics,
		reducer,
		constants
	},
	isCommunityProtected: true
};
