import  epics from './src/metaEpics';
import { reducer } from './src/metaReducer';
import * as selector from './src/metaSelectors';
import * as constants from './src/metaConstants';
import Meta from './src/metaPage';
import { MetaMenu } from './src/metaMenu';

export default {
	name: 'Config',
	page: Meta,
	menu: MetaMenu,
	store: {
		name: 'meta',
		epics,
		reducer,
		selector,
		constants
	}
};
