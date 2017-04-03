import  epics from './metaEpics';
import { reducer } from './metaReducer';
import * as selector from './metaSelectors';
import * as constants from './metaConstants';
import Meta from './metaPage';
import { MetaMenu } from './metaMenu';

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