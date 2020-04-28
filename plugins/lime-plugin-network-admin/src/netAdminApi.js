import { map } from 'rxjs/operators';

export const login = (api, sid, sharedPassword) => {
	// Set the session to expire in 24 hours.
	const msg = { user: 'root', password: sharedPassword, timeout: 3600 * 24};
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
	api.call(sid, 'lime-admin-utils', 'set-shared-root-password', { sharedPassword: sharedPassword });
