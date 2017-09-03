import  epics from './src/rxEpics';
import { reducer } from './src/rxReducer';
import * as selector from './src/rxSelectors';
import * as constants from './src/rxConstants';
import Rx from './src/rxPage';
import { RxMenu } from './src/rxMenu';

export default {
	name: 'Rx',
	page: Rx,
	menu: RxMenu,
	store: {
		name: 'rx',
		epics,
		reducer,
		selector,
		constants
	}
};
