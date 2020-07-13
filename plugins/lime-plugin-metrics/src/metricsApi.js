import { map } from 'rxjs/operators';

export const getMetrics = (api, params) => api.call('lime-metrics', 'get_metrics', params).pipe(
	map(result => Object.assign({}, result, { target: params.target }))
);

export const getAllMetrics = (api, params) => params.targets.map(x => getMetrics(api, { target: x }));

export const getGateway = (api) => api.call('lime-metrics', 'get_gateway', {});

export const getPath = (api, params) => api.call('lime-metrics', 'get_path', params);

export const getLastKnownPath = (api, params) => api.call('lime-metrics', 'get_last_internet_path', params);
