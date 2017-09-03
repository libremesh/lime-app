import  epics from './src/notesEpics';
import { reducer } from './src/notesReducer';
import * as constants from './src/notesConstants';
import Page from './src/notesPage';
import { Menu } from './src/notesMenu';

export default {
	name: 'Notes',
	page: Page,
	menu: Menu,
	store: {
		name: 'notes',
		epics,
		reducer,
		constants
	}
};