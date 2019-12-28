import epics from './src/piraniaEpics';
import { reducer } from './src/piraniaReducer';
import * as selector from './src/piraniaSelectors';
import * as constants from './src/piraniaConstants';
import Pirania from './src/PiraniaPage';
import { PiraniaMenu } from './src/piraniaMenu';

export default {
	name: 'Acceso',
	page: Pirania,
	menu: PiraniaMenu,
	store: {
		name: 'Acceso',
		epics,
		reducer,
		selector,
		constants
	}
};
