import {
    GET_NODE_STATUS,
    TIMER_STOP
} from './rxConstants';

import { push } from 'preact-router-redux';

export const getNodeStatus = () => (dispatch) => {
  dispatch({
    type: GET_NODE_STATUS,
    payload: {}
  });
};

export const stopTimer = () => (dispatch) => {
  dispatch({
    type:TIMER_STOP
  });
};

export const changeNode = (hostname) => (dispatch) => {
  dispatch(push('changeNode/'+hostname));
};