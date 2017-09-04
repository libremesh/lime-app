import  epics from './src/alignEpics';
import { reducer } from './src/alignReducer';
import * as selector from './src/alignSelectors';
import * as constants from './src/alignConstants';
import Page from './src/alignPage';
import { AlignMenu } from './src/alignMenu';

export default {
	name: 'Align',
	page: Page,
	menu: AlignMenu,
	store: {
		name: 'align',
		epics,
		reducer,
		selector,
		constants
	}
};
