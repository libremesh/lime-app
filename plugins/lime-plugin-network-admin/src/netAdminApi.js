import { map } from 'rxjs/operators';

export const login = (api, sid, sharedPassword) => {
	const msg = { username: 'root', password: sharedPassword, timeout: 500};
	return api.call(sid, 'session', 'login', msg).pipe(
		map(result => {
			if (result && result.ubus_rpc_session) {
				return result.ubus_rpc_session;
			} else {
				throw new Error('Login error');
			}
		})
	);
}

export const setSharedPassword = (api, sid, sharedPassword) =>
	api.call(sid, 'lime-utils-admin', 'set_root_password', { password: sharedPassword });
