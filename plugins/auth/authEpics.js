import 'rxjs/add/operator/mapTo';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS
} from './authConstants';

import {
    CONECTION_SUCCESS
} from '../meta/metaConstants';

const defaultLoginAction = ( action$ ) =>
  action$.ofType(CONECTION_SUCCESS)
    .mapTo({ type: AUTH_LOGIN, payload: {user: 'admin', password: 'admin'}});

const loginAction = ( action$, store, { wsAPI } ) =>
  action$.ofType(AUTH_LOGIN)
    .mergeMap( action => wsAPI.login(action.payload))
    .map((sid) => ({ type: AUTH_LOGIN_SUCCESS, payload: sid }));

export default { defaultLoginAction, loginAction };

 