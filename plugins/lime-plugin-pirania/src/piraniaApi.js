import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

export const login = (sid, api, auth) =>
	api.call(sid, 'session', 'login', Object.assign({}, auth, { timeout: 5000 }))
		.map(result => {
			try {
				if (typeof result.ubus_rpc_session === 'undefined') {
					throw new Error('Login error');
				}
			}
			catch (error){
				// do nothing
			}
			return result.ubus_rpc_session;
		});

export const changeConfig = (api, sid, config) =>
	api.call(sid, 'lime-utils', 'change_config', { name: config.hostname, ip: config.ip });
