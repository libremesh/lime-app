import { push } from 'preact-router-redux';

import {
	LOAD_METRICS,
	LOAD_METRICS_ALL,
	LOAD_METRICS_GATEWAY
} from './metricsConstants';

export const getMetrics = ( ) => (dispatch) => {
	dispatch({
		type: LOAD_METRICS
	});
};

export const getMetricsAll = ( ) => (dispatch) => {
	dispatch({
		type: LOAD_METRICS_ALL
	});
};

export const getMetricsGateway = ( hostname ) => (dispatch) => {
	dispatch({
		type: LOAD_METRICS_GATEWAY,
		payload: { hostname }
	});
};

export const changeNode = (hostname) => (dispatch) => {
	dispatch(push('changeNode/'+hostname));
};