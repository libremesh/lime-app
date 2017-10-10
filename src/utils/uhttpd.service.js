import axios from 'axios';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

export class UhttpdService {
	constructor(url){
		this.url = url;
		this.sid = '00000000000000000000000000000000';
		this.jsonrpc = '2.0';
		this.sec = 0;
	}
	addId(){
		this.sec += 1;
		return Number(this.sec);
	}

	request(payload) {
		return Observable.fromPromise(axios.post(this.url, {
			id: this.addId(),
			jsonrpc: this.jsonrpc,
			method: 'call',
			params: payload
		})).map(x => x.data.result[1]);
	}

	call(sid,action, method, data) {
		return this.request([sid, action, method, data]);
	}

	connect(newUrl) {
		this.url = newUrl;
		return Observable.fromPromise( new Promise((res,rej) => {
			axios.get(this.url).catch(
				err => {
					try {
						( err.response.status === 400)? res(): rej();
					}
					catch (error) {
						rej();
					}

				}
			);
		}));
	}

}