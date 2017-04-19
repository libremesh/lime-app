import {
  LOAD_METRICS
} from './metricsConstants';

export const getMetrics = ( ) => (dispatch, getState) => {
  dispatch({
    type: LOAD_METRICS
  });
};