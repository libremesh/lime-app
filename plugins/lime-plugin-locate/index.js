import  epics from './src/locateEpics';
import { reducer } from './src/locateReducer';
import * as selector from './src/locateSelectors';
import * as constants from './src/locateConstants';
import Locate from './src/locatePage';
import { LocateMenu } from './src/locateMenu';

export default {
  name: 'Locate',
  page: Locate,
  menu: LocateMenu,
  store: {
    name: 'locate',
    epics,
    reducer,
    selector,
    constants
  }
};
