import 'rxjs/add/operator/mapTo';
import {
  CONECTION_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS
} from '../actions/ActionTypes';


export const defaultLoginAction = ( action$ ) =>
  action$.ofType(CONECTION_SUCCESS)
    .mapTo({ type: AUTH_LOGIN, payload: {user: 'admin', password: 'admin'}});

export const loginAction = ( action$, store, { wsAPI } ) =>
  action$.ofType(AUTH_LOGIN)
    .mergeMap( action => wsAPI.login(action.payload))
    .map((sid) => ({ type: AUTH_LOGIN_SUCCESS, payload: sid }));

 