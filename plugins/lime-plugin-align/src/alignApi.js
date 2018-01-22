export const getIfaceStation = (api, sid, iface) => api.call(sid, 'lime-openairview', 'get_iface_stations', { iface })
	.map(x => x.stations)
	.map(data => Object.keys(data).map((key, index) => data[key]).reduce((x,y) => x.concat(y), []))
	.map((nodes) => nodes.map(node => {
		if (node.signal) {
			node.signal = Number(node.signal);
		}
		return node;
	}))
	.map((nodes) => ({ iface, nodes }))
	.map( x => {
		if (x.nodes.length > 0) { return x; }
		throw new Error();
	});

export const getStationSignal = (api, sid, node) => api.call(sid, 'lime-openairview', 'get_station_signal', { station_mac: node.mac, iface: node.iface });

export const getInterfaces = (api, sid) => api.call(sid, 'lime-openairview', 'get_interfaces', {})
	.map(res => res.interfaces);

export const getStations = (api,sid,ifaces) => new Promise((res,rej) => {
	const result = ifaces.map((iface) => new Promise((res, rej) => {
		api.call(sid, 'lime-openairview', 'get_stations', { device: iface.name })
			.map(x => x.stations)
			.map(data => Object.keys(data).map((key, index) => data[key]).reduce((x,y) => x.concat(y), []))
			.map((y) => y.reduce((a, b) => a.concat(b), []))
			.map((nodes) => nodes.map(node => ({
				mac: node.station_mac,
				hostname: node.station_hostname,
				signal: Number(node.attributes.signal),
				iface: iface.name
			})))
			.subscribe(res, rej);
	}));
	Promise.all(result)
		.then((stations) => res(stations.reduce((a, b) => a.concat(b),[])))
		.catch(rej);
});
