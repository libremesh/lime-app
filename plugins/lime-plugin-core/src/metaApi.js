import { map } from 'rxjs/operators';

export const login = (sid, api, auth) =>
	api.call(sid, 'session', 'login', Object.assign({}, auth, { timeout: 5000 }))
		.pipe(
			map(result => result.ubus_rpc_session)
		);

export const changeUrl = (api, url) =>
	api.connect(url);

export const getCloudNodes = (api, sid) => api.call(sid, 'lime-utils', 'get_cloud_nodes', {})
	.pipe(
		map(x => x.nodes),
		map(data => Object.keys(data).map((key) => data[key]).reduce((x,y) => x.concat(y), []))
	);

export const getHostname = (api, sid) => api.call(sid, 'system', 'board', { });

export const getCommunitySettings = (api, sid) => api.call(sid, 'lime-utils', 'get_community_settings', { });