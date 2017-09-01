export const getNodeStauts = (api, sid) => {
  return api.call(sid, 'get_node_status', {});
};

export const getStationTraffic = (api, sid, node) => {
  return api.call(sid, 'get_station_traffic', { station_mac: node.mac, iface: node.iface });
};

export const getStationSignal = (api, sid, node) => {
  return api.call(sid, 'get_station_signal', { station_mac: node.mac, iface: node.iface });
};

export const getInternetStatus = (api, sid) => {
  return api.call(sid, 'get_internet_status', {});
};
