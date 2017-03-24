import { CONECTION_SUCCESS, AUTH_LOGIN, AUTH_LOGIN_SUCCESS } from '../actions/ActionTypes';

export const defaultLoginAction = ( action$ ) => 
  action$.ofType(CONECTION_SUCCESS)
        .mapTo({ type: AUTH_LOGIN, payload: {user: 'admin', password: 'admin'}});

 export const loginAction = ( action$ ) => 
  action$.ofType(AUTH_LOGIN)
        .mergeMap( action => window.wsAPI.login(action.payload))
            .map((sid) => ({ type: AUTH_LOGIN_SUCCESS, payload: sid }));

 