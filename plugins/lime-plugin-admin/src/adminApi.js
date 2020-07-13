export const changeConfig = (api, config) =>
	api.call('lime-utils', 'change_config', { hostname: config.hostname, ip: config.ip });
