import JsSHA from 'jssha';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

const getChallenge = (api) => api.call('','',[],'challenge');

const shaToken = (password, token) => {
	let shaPassword = new JsSHA('SHA-1', 'TEXT');
	let shaToken = new JsSHA('SHA-1', 'TEXT');
	shaPassword.update(password);
	shaToken.update(token);
	shaToken.update(shaPassword.getHash('HEX'));
	return shaToken.getHash('HEX');
};

export const login = (api, auth) => getChallenge(api)
	.map(x => x.token)
	.switchMap((token) => {
		let shaPassword = shaToken(auth.password, token);
		return api.call('','', [auth.user, shaPassword],'login').map(data => data.success);
	});

export const changeUrl = (api, url) => {
	api._wss.url = url;
	return api.call('','',[],'reconect');
};

export const getCloudNodes = (api, sid) => api.call(sid, 'get_cloud_nodes', {})
	.map(x => x.nodes)
	.map(data => Object.keys(data).map((key) => data[key]).reduce((x,y) => x.concat(y), []));

export const getHostname = (api, sid) => api.call(sid, 'get_hostname', {});