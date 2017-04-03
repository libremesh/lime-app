import epics from './locateEpics';
import { reducer } from './locateReducer';
import * as selector from './locateSelectors';
import Locate from './locatePage';
import { LocateMenu } from './locateMenu';
import * as constants from './locateConstants';

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