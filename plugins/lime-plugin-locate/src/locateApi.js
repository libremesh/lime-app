export const getLocation = (api) => api.call('lime-location', 'get', {});

export const getNodesandlinks = (api) => api.call('lime-location', 'all_nodes_and_links', {});

export const changeLocation = (api, location) =>
	api.call('lime-location', 'set',
		{ lat: location.lat.toFixed(5), lon: location.lon.toFixed(5) });
