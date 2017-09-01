export const getIfaceStation = (api, sid, iface) => {
  return api.call(sid, 'get_iface_stations', { iface })
    .map(x => x.stations)
    .map(data => Object.keys(data).map((key, index)=>data[key]).reduce((x,y) => x.concat(y), []))
    .map((nodes) => nodes.map(node => {
      if (node.signal) {
        node.signal = Number(node.signal);
      }
      return node;
    }))
    .map((nodes) => { return { iface, nodes }; })
    .map( x => {
      if (x.nodes.length > 0) { return x; }
      throw new Error();
    });
};

export const getStationSignal = (api, sid, node) => {
  return api.call(sid, 'get_station_signal', { station_mac: node.mac, iface: node.iface });
};

export const getInterfaces = (api, sid) => {
  return api.call(sid, 'get_interfaces', {})
    .map(res => res.interfaces)
    .map(iface => iface.map((x) => { return { name: x }; }));
};

export const getStations = (api,sid) => {
  return new Promise((res,rej) => {
    api.call(sid, 'get_stations', {})
      .map(x => x.stations)
      .map(data => Object.keys(data).map((key, index)=>data[key]).reduce((x,y) => x.concat(y), []))
      .map((y) => {
        return y.reduce((a, b) => a.concat(b), []);
      })
      .map((nodes) => nodes.map(node => {
        node.signal = Number(node.signal);
        return node;
      }))
      .subscribe( x => {
        if (x.length > 0) { res(x); }
        rej(x);
      });
  });
};