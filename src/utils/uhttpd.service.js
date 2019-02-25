import axios from 'axios';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

function ab2str(buf) {
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function str2ab(str) {
	let buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
	let bufView = new Uint16Array(buf);
	for (let i=0, strLen=str.length; i < strLen; i++) {
	  bufView[i] = str.charCodeAt(i);
	}
	return buf;
}

export class UhttpdService {
	constructor(url){
		this.url = url;
		this.sid = '00000000000000000000000000000000';
		this.jsonrpc = '2.0';
		this.sec = 0;
		this.requestList = [];
	}

	addId(){
		this.sec += 1;
		return Number(this.sec);
	}
	
	pullRequest(){
		if (this.requestList.length > 0) {
			this.requestList[0].callRequest();
		}
	}

	runCallbacks(result, callbacks) {
		callbacks.map(({ res, rej }) => {
			if (result.error) { return res(result.error);}
			res(result.result[1]);
		});
	}

	request(payload) {
		return new Promise((res, rej) => {
			window.crypto.subtle.digest('SHA-1',str2ab(JSON.stringify(payload))).then(result => {
				const hash = ab2str(result);
				if (this.requestList.filter(x => x.hash === hash).length > 0) {
					this.requestList.filter(x => x.hash === hash)[0].callbacks = [...this.requestList.filter(x => x.hash === hash)[0].callbacks, { res,rej }];
					return;
				}
				const id = this.addId();
				this.requestList = [...this.requestList, {
					hash,
					id,
					callbacks: [{ res,rej }],
					callRequest: () => axios.post(this.url, {
						id,
						jsonrpc: this.jsonrpc,
						method: 'call',
						params: payload
					})
						.then(x => {
							const callbacks = this.requestList.filter(x => x.id === id)[0].callbacks;
							this.runCallbacks(x.data, callbacks);
							this.requestList = this.requestList.filter(x => x.id !== id);
							this.pullRequest();
							
						})
						.catch(e => {
							rej(e);
							this.requestList = this.requestList.filter(x => x.id !== id);
							this.pullRequest();
						})
				}];
				if (this.requestList.length === 1) {
					this.requestList[0].callRequest();
				}
			});
		});
	}
	

	call(sid,action, method, data) {
		return Observable.fromPromise(this.request([sid, action, method, data]));
	}

	connect(newUrl) {
		this.url = newUrl;
		return Observable.fromPromise( new Promise((res,rej) => {
			axios.post(this.url)
				.then(response => ( typeof response.data.jsonrpc !== 'undefined')? res(): rej())
				.catch(
					(err) => {
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