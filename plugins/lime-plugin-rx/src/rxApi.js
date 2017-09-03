export const getNodeStauts = (api, sid) => api.call(sid, 'get_node_status', {});

export const getStationTraffic = (api, sid, node) => api.call(sid, 'get_station_traffic', { station_mac: node.mac, iface: node.iface });

export const getStationSignal = (api, sid, node) => api.call(sid, 'get_station_signal', { station_mac: node.mac, iface: node.iface });

export const getInternetStatus = (api, sid) => api.call(sid, 'get_internet_status', {});
