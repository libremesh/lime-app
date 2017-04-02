import epics from './authEpics';
import * as constants from './authConstants';


export default {
  name: 'auth',
  page: false,
  store: {
    epics,
    constants
  }
};