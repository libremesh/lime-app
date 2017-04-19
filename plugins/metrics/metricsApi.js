export const getMetrics = (api, sid,params) => {
  return api.call(sid, 'get_metrics', params)
    .map( x => { console.log(x); return x;})
    .map(result => result);
};

export const getAllMetrics = (api, sid, params) => {
  return params.targets.map(x => getMetrics(api,sid, {target:x}));
};

export const getGateway = (api, sid) => {
  return api.call(sid, 'get_gateway', {})
    .map(result => result);
};

export const getPath = (api, sid, params) => {
  return api.call(sid, 'get_path', params)
    .map(data => Object.keys(data).map((key, index)=>data[key]).reduce((x,y) => x.concat(y), []));
};