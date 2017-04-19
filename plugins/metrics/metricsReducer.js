import {
  LOAD_METRICS,
  LOAD_METRICS_SUCCESS
} from './metricsConstants';


const initialState = {
  metrics: [],
  error:null,
  loading: false
};

export const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case LOAD_METRICS:
      return Object.assign({}, initialState, {loading:true});
    default:
      return state;
  }
};