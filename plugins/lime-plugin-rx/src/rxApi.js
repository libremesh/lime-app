export const getNodeStauts = (api, sid) => api.call(sid, 'lime-utils', 'get_node_status', {});

export const getStationTraffic = (api, sid, node) => {
	if (typeof node === 'undefined') return [];
	return api.call(sid, 'lime-metrics', 'get_station_traffic', { station_mac: node.station_mac, iface: node.iface })
};

export const getStationSignal = (api, sid, node) => {
	if (typeof node === 'undefined') return [];
	return api.call(sid, 'lime-openairview', 'get_station_signal', { station_mac: node.station_mac, iface: node.iface });
};

export const getInternetStatus = (api, sid) => api.call(sid, 'lime-metrics', 'get_internet_status', {});
