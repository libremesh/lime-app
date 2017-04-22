import { WebSocketService } from '../utils/webSockets.observable';

const jsSHA = require("jssha");

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';



class WebsocketAPI {
  responses = [];
  sec = 0;
  socket;
  constructor(_wss) {
    this._wss = _wss;
    this.jsonrpc = '2.0';
  }

  register(x) {
    
    if (x.type === 'message'){
      let data = JSON.parse(x.data);
      this.responses[data.id](data);
      delete this.responses[data.id];
    }
    else if (x.type === 'open') {
      this.responses['conect'](true);
    }
  }

  conect(url) {
    this.socket = this._wss.connect(url);
    this.socket.subscribe(this.register.bind(this));
    let observable = Observable.create((obs)=>{
      this.responses['conect'] = obs.next.bind(obs);
    });
    return observable;
  }

  addId(){
    this.sec += 1;
    return Number(this.sec);
  }

  send(mensaje) {
    const newMensaje = Object.assign({}, mensaje, {id:this.addId(), jsonrpc: this.jsonrpc});
    this.socket.next(newMensaje);
    return newMensaje.id;
  }

  call(sid, action, data, method) {
    let id;
    let observable = Observable.create((obs)=>{
      if (typeof method === 'undefined') { method = 'call'; }
      if (method !== 'login')  {
        id = this.send({ method, 'params': [
          sid, '/lime/api', action, data
        ]});
      } else {
        id = this.send({ method, 'params': data });
      }

      let filter = (x) => x.id === id;
      this.responses[id] = (data) => {
        obs.next(data);
        obs.complete();
      };
    
    });
    return observable
        .filter((x) => x.id === id)
        .map(x => x.result);
  }

  getLocation = (sid) => {
    return this.call(sid, 'get_location', {});
  }

  changeLocation(sid, location) {
    return this.call(sid, 'set_location', location);
  }

}


// Websockets services
export default new WebsocketAPI(new WebSocketService());