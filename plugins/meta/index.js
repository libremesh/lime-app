import  epics from './metaEpics';
import { reducer } from './metaReducer';
import * as selector from './metaSelectors';
import * as constants from './metaConstants';
import Meta from './metaPage';

export default {
  name: 'Config',
  page: Meta,
  store: {
    name: 'meta',
    epics,
    reducer,
    selector,
    constants
  }
};