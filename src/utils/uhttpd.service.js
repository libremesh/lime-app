import axios from 'axios';
import { from } from 'rxjs';

String.prototype.hashCode = function() {
	let hash = 0;
	if (this.length === 0) {
		return hash;
	}
	for (let i = 0; i < this.length; i++) {
		let char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash;
	}
	return hash.toString();
};

const getHash = (json ) => Promise.resolve(json.hashCode());

const UNAUTH_SESSION_ID = '00000000000000000000000000000000';
const DEFAULT_SESSION_TIMEOUT = 5000;

export class UhttpdService {
	constructor(){
		this.url = window.origin + '/ubus';
		this.sid = '00000000000000000000000000000000';
		this.jsonrpc = '2.0';
		this.sec = 0;
		this.requestList = [];
	}

	sid() {
		return sessionStorage.getItem('sid');
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
			if (result.error) { return rej(result.error);}
			if (result.result[0] !== 0) { return rej(result);}
			res(result.result[1]);
		});
	}

	request(payload, customSid=null) {
		return new Promise((res, rej) => {
			const sid = customSid || this.sid();
			getHash(JSON.stringify([sid, ...payload])).then(hash => {
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
						params: [sid, ...payload]
					}, { timeout: 15000 })
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
	

	call(action, method, data, customSid=null) {
		return from(this.request([action, method, data], customSid));
	}

	login(username, password) {
		const data = { username, password, timeout: DEFAULT_SESSION_TIMEOUT };
		return this.request(['session', 'login', data], UNAUTH_SESSION_ID)
			.then(response =>
				new Promise((res, rej) => {
					if (response.ubus_rpc_session) {
						sessionStorage.setItem('sid', response.ubus_rpc_session);
						res(response);
					}
					else {
						rej(response);
					}
				}));
	}
}

const uhttpdService = new UhttpdService();
export default uhttpdService;
