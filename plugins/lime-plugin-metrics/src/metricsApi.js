export const getMetrics = (api, sid,params) => api.call(sid, 'get_metrics', params)
	.map(result => Object.assign({}, result, { hostname: params.target })
	);

export const getAllMetrics = (api, sid, params) => params.targets.map(x => getMetrics(api,sid, { target: x }));

export const getGateway = (api, sid) => api.call(sid, 'get_gateway', {})
	.map(result => result);

export const getPath = (api, sid, params) => api.call(sid, 'get_path', params)
	.map(data => Object.keys(data.path).map((key, index) => data.path[key]).reduce((x,y) => x.concat(y), []));


export const getLastKnownPath = (api, sid, params) => api.call(sid, 'get_last_internet_path', params)
	.map(data => Object.keys(data.path).map((key, index) => data.path[key]).reduce((x,y) => x.concat(y), []));