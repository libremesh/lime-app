import {
	LOAD_METRICS,
	LOAD_METRICS_ALL
} from './metricsConstants';

import {
	GET_INTERNET_STATUS
} from '../../lime-plugin-rx/src/rxConstants';

export const getMetrics = ( ) => ({
	type: LOAD_METRICS
});


export const getMetricsAll = ( ) => ({
	type: LOAD_METRICS_ALL
});

export const getInternetStatus = () => ({
	type: GET_INTERNET_STATUS
});

export const getMetricsGateway = ( ) => ({
	type: LOAD_METRICS
});
