import { 
    CONECTION_START,
    CONECTION_ERROR,
    CONECTION_SUCCESS,
    CONECTION_CHANGE_URL,
    CONECTION_SETTINGS
} from '../actions/ActionTypes';

export const conectionOff = ( action$ ) => 
  action$.ofType(CONECTION_START)
    .mapTo((action) => ({type: CONECTION_SETTINGS, payload: {conection: false, ws: action.payload }}));

export const conectionAction = ( action$ ) => 
  action$.ofType(CONECTION_START)
    .mergeMap( url => window.wsAPI.conect(url.payload))
        .mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } });

export const changeUrlAction = ( action$ ) => 
  action$.ofType(CONECTION_CHANGE_URL)
    .mergeMap( url => window.wsAPI.changeUrl(url.payload))
        .mapTo({ type: CONECTION_SUCCESS, payload: { conection: true } });
