import epics from './alignEpics';
import { reducer } from './alignReducer';
import * as selector from './alignSelectors';
import Align from './alignPage';
import { AlignMenu } from './alignMenu';
import * as constants from './alignConstants';


export default {
  name: 'Align',
  page: Align,
  menu: AlignMenu,
  store: {
    name: 'align',
    epics,
    reducer,
    selector,
    constants
  }
};