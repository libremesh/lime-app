export const changeHostname = (api, hostname) =>
	api.call('lime-utils-admin', 'set_hostname', { hostname });
