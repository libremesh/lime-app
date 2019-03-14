import axios from 'axios';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

String.prototype.hashCode = function() {
	let hash = 0, i, chr;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
	  chr   = this.charCodeAt(i);
	  hash  = ((hash << 5) - hash) + chr;
	  hash |= 0; // Convert to 32bit integer
	}
	return hash.toString();
};

const getHash = (text = '') => Promise.resolve(text.hashCode());

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
			getHash(JSON.stringify(payload)).then(hash => {
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