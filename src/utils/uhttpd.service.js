import axios from 'axios';
import { from } from 'rxjs';

String.prototype.hashCode = function () {
	let hash = 0;
	if (this.length === 0) {
		return hash;
	}
	for (let i = 0; i < this.length; i++) {
		let char = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash;
	}
	return hash.toString();
};

const getHash = (json) => Promise.resolve(json.hashCode());

export class UhttpdService {
	constructor(url) {
		this.url = url;
		this.sid = '00000000000000000000000000000000';
		this.jsonrpc = '2.0';
		this.sec = 0;
		this.requestList = [];
	}

	addId() {
		this.sec += 1;
		return Number(this.sec);
	}

	pullRequest() {
		if (this.requestList.length > 0) {
			this.requestList[0].callRequest();
		}
	}

	runCallbacks(result, callbacks) {
		callbacks.map(({ res, rej }) => {
			if (result.error) { return res(result.error); }
			res(result.result[1]);
		});
	}

	request(payload) {
		return new Promise((res, rej) => {
			getHash(JSON.stringify(payload)).then(hash => {
				if (this.requestList.filter(x => x.hash === hash).length > 0) {
					this.requestList.filter(x => x.hash === hash)[0].callbacks = [...this.requestList.filter(x => x.hash === hash)[0].callbacks, { res, rej }];
					return;
				}
				const id = this.addId();
				this.requestList = [...this.requestList, {
					hash,
					id,
					callbacks: [{ res, rej }],
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
		return from(this.request([sid, action, method, data]));
	}

	connect(newUrl) {
		this.url = newUrl;
		return from( new Promise((res,rej) => {
			axios.post(this.url)
				.then(response => (typeof response.data.jsonrpc !== 'undefined') ? res() : rej())
				.catch(
					(err) => {
						try {
							(err.response.status === 400) ? res() : rej();
						}
						catch (error) {
							rej();
						}

					}
				);
		}));
	}

}
