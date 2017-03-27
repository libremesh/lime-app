const jsSHA = require("jssha");

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';



export class WebsocketAPI {
  constructor(_wss) {
    this._wss = _wss;
    this.jsonrpc = '2.0';
    this.sec = 0;
  }
  conect(url) {
    this.socket = this._wss.connect(url);
    return this.socket;
  }
  send(mensaje) {
    this.sec += 1;
    mensaje.id = this.sec;
    mensaje.jsonrpc = this.jsonrpc;
    this.socket.next(mensaje);
    return this.socket.map(x => JSON.parse(x.data))
      .filter(x => x.id === mensaje.id)
      .map(x => x.result);
  }
  call(sid, action, data) {
    return this.send({ 'method': 'call', 'params': [
      sid, '/lime/api', action, data
    ]});
  }
  login(auth) {
    return this.getChallenge()
      .map(x => x.token)
      .switchMap((token) => {
        let shaPassword = this.shaToken(auth.password, token);
        return this.send({ 'method': 'login', 'params': [auth.user, shaPassword] }).map(data => data.success);
      });
  }
  getChallenge() {
    return this.send({ 'method': 'challenge', 'params': [] });
  }

  shaToken(password, token) {
    let shaPassword = new jsSHA("SHA-1", "TEXT");
    let shaToken = new jsSHA("SHA-1", "TEXT");
    shaPassword.update(password);
    shaToken.update(token);
    shaToken.update(shaPassword.getHash('HEX'));
    return shaToken.getHash('HEX');
  }
  changeUrl(url) {
    this._wss.url = url;
    this.send({ 'method': 'reconect' });
    return this.socket;
  }
  getInterfaces(sid) {
    return this.call(sid, 'get_interfaces', {})
      .map(res => res.interfaces)
      .map(iface => iface.map((x) => { return { name: x }; }));
  }
  getNeighbors(sid) {
    return this.call(sid, 'get_neighbors', {});
  }

  getStations(sid) {
    return this.call(sid, 'get_stations', {})
      .map(data => Object.keys(data).map((key, index)=>data[key]).reduce((x,y) => x.concat(y), []))
      .map((y) => {
        return y.reduce((a, b) => a.concat(b), []);
      })
      .map((nodes) => nodes.map(node => {
        node.signal = Number(node.signal);
        return node;
      }));
  }
  getIfaceStation(sid, iface) {
    let a = new Promise((res,rej) => {
      this.call(sid, 'get_iface_stations', { iface })
        .map(data => Object.keys(data).map((key, index)=>data[key]).reduce((x,y) => x.concat(y), []))
        .map((nodes) => nodes.map(node => {
          if (node.signal) {
            node.signal = Number(node.signal);
          }
          return node;
        }))
        .map((nodes) => { return { iface, nodes }; })
        .subscribe( x => {
          if (x.nodes.length > 0) { res(x); }
          rej(x);
        });
    });
    return a;
  }
  getStationSignal(sid, node) {
    return this.call(sid, 'get_station_signal', { station_mac: node.mac, iface: node.iface })
      .map((x) => {
        x.signal = Number(x.signal);
        return x;
      });
  }
  getLocation(sid) {
    return this.call(sid, 'get_location', {});
  }

  changeLocation(sid, location) {
    return this.call(sid, 'set_location', location);
  }

  getHostname(sid) {
    return this.call(sid, 'get_hostname', {});
  }
}
