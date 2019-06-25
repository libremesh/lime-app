import {
	LOAD_METRICS,
	LOAD_METRICS_SUCCESS,
	LOAD_PATH,
	LOAD_PATH_SUCCESS,
	LOAD_PATH_NOT_FOUND,
	LOAD_GATEWAY_SUCCESS,
	LOAD_GATEWAY_NOT_FOUND,
	LOAD_METRICS_GATEWAY,
	LOAD_METRICS_GATEWAY_SUCCESS,
	LOAD_METRICS_ALL
} from './metricsConstants';


const initialState = {
	metrics: [],
	error: [],
	loading: false,
	status: ''
};

const getMetrics = (data, payload) => data.map(x => {
	if (x.bandwidth < payload.bandwidth) { x.bandwidth = payload.bandwidth; }
	if (x.loss > payload.loss) { x.loss = payload.loss; }
	if (x.host.ip !== payload.target) { return x; }
	x.loading = false;
	return Object.assign({}, x, payload);
});

export const reducer = (state = initialState, { type, payload, meta }) => {
	switch (type) {
		case LOAD_METRICS:
			return Object.assign({}, initialState, { loading: true, status: 'metrics_status_gateway' });
		case LOAD_PATH:
			return Object.assign({}, state, { loading: true, metrics: [], status: 'metrics_status_path' });
		case LOAD_GATEWAY_SUCCESS:
			return Object.assign({}, state, { gateway: payload.gateway, status: 'metrics_status_path' });
		case LOAD_GATEWAY_NOT_FOUND:
			return Object.assign({}, state, { error: state.error.concat('last_known_internet_path'), status: 'load_last_known_internet_path' });
		case LOAD_PATH_SUCCESS:
			return Object.assign({}, state, {
				metrics: payload.map(node => ({ host: {
					ip: node.ip,
					hostname: node.hostname !== ''? node.hostname: node.ip
				}, loading: true, error: false })),
				loading: true, status: 'metrics_status_stations'
			});
		case LOAD_PATH_NOT_FOUND:
			return Object.assign({}, state, { error: state.error.concat(payload.error), loading: false, status: '' });
		case LOAD_METRICS_SUCCESS:
			return Object.assign({}, state, {
				metrics: getMetrics(state.metrics, payload),
				loading: getMetrics(state.metrics, payload).filter(x => x.loading === true).length !== 0,
				status: 'metrics_status_stations'
			});
		case LOAD_METRICS_GATEWAY:
			return Object.assign({}, state, {
				metrics: state.metrics.map(x => {
					if (x.host.hostname !== state.gateway) { return x; }
					x.loading = true;
					return Object.assign({}, x, payload);
				}),
				loading: true,
				status: 'metrics_status_stations'
			});
		case LOAD_METRICS_GATEWAY_SUCCESS:
			return Object.assign({}, state, {
				metrics: state.metrics.map(x => {
					if (x.host.hostname !== payload.target) { return x; }
					x.loading = false;
					return Object.assign({}, x, payload);
				}),
				loading: false
			});
		case LOAD_METRICS_ALL:
			return Object.assign({}, state, { metrics: state.metrics.map(x => Object.assign({},x, { loading: true })), loading: true });
		default:
			return state;
	}
};