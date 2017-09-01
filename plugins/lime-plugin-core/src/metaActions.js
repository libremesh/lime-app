import {
    CONECTION_CHANGE_URL,
    CONECTION_CHANGE_CURRENT_BASE
} from './metaConstants';

export const changeBase = ( hostname ) => (dispatch, getState) => {
  dispatch({
    type: CONECTION_CHANGE_URL,
    payload: 'ws://'+ hostname +'/websocket/'
  });
  dispatch({
    type: CONECTION_CHANGE_CURRENT_BASE,
    payload: hostname
  });
};