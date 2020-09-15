export const changeHostname = (api, hostname) =>
	api.call('lime-utils-admin', 'set_hostname', { hostname });

export const getIpV4 = (api) =>
	api.call('lime-utils', 'get_node_status', {})
