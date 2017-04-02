import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class WebSocketService {
  constructor(){
    this.url = '';
  }
  

  connect(url) {
    this.url = url;
    if (!this.subject) {
      this.subject = this.create();
    }
    return this.subject;
  }

  create() {
    let autoReconnectInterval = 2000;
    let ws;
    
    const open = () => {
      ws = new WebSocket(this.url);
    };

    const reconect = (e, oldWs) => {
      console.log(`WebSocketClient: retry in ${autoReconnectInterval}ms`, e);
      setTimeout(function(){
        console.log('WebSocketClient: reconnecting ' + this.url + '...');
        open();
        ws.onopen = oldWs.onopen;
        ws.onmessage = oldWs.onmessage;
        ws.onerror = oldWs.onerror;
      }, autoReconnectInterval);
    };

    let observable = Observable.create(
      (obs) => {
        ws.onopen  = obs.next.bind(obs);
        ws.onmessage = obs.next.bind(obs);
        ws.onerror   = (err) => {
          reconect(err, ws);
        };
        ws.close   = () => {
          reconect(null, ws);
        };
      });

    let observer = {
      next: (data) => {
        if (data.method === 'reconect') {
          reconect(null, ws);
        } else if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    open();

    return Subject.create(observer, observable);
  }

}
