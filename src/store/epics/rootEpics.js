import { combineEpics } from 'redux-observable'

import { conectionAction, changeUrlAction }  from './conection'
import { defaultLoginAction, loginAction} from './auth'
import { ifaceLoad, allStationsLoad, getSignal, ifaceChange, initAlign, runTimer } from './align'
import { locateLoad, locateChange } from './locate'

export const rootEpics = combineEpics(
  conectionAction,
  changeUrlAction,
  defaultLoginAction,
  loginAction,
  ifaceLoad,
  ifaceChange,
  allStationsLoad,
  initAlign,
  getSignal,
  runTimer,
  locateLoad,
  locateChange
);