import { push } from 'preact-router-redux';

import {
	LOAD_METRICS,
	LOAD_METRICS_ALL
} from './metricsConstants';

import {
	GET_INTERNET_STATUS
} from '../../lime-plugin-rx/src/rxConstants';

export const getMetrics = ( ) => (dispatch) => {
	dispatch({
		type: LOAD_METRICS
	});
	dispatch({
		type: GET_INTERNET_STATUS
	});
};

export const getMetricsAll = ( ) => (dispatch) => {
	dispatch({
		type: LOAD_METRICS_ALL
	});
};

export const getMetricsGateway = ( hostname ) => (dispatch) => {
	dispatch({
		type: LOAD_METRICS
	});
	dispatch({
		type: GET_INTERNET_STATUS
	});
};
