const UNAUTH_SESSION_ID = '00000000000000000000000000000000';
const DEFAULT_SESSION_TIMEOUT = 5000;

const parseResult = result =>
	new Promise((res, rej) => {
		if (result.error) { return rej(result.error); }
		if (result.result[0] !== 0) { return rej(result); }
		result = result.result[1];
		if (result && result.status === 'error') {
			return rej(result.message);
		}
		return res(result);
	})

export class UhttpdService {
	constructor() {
		this.url = window.origin + '/ubus';
		this.jsonrpc = '2.0';
		this.sec = 0;
		this.requestList = [];
	}

	sid() {
		return sessionStorage.getItem('sid');
	}

	addId() {
		this.sec += 1;
		return Number(this.sec);
	}


	call(action, method, data, customSid = null) {
		this.sec +=1;
		const body = {
			id: this.addId(),
			jsonrpc: this.jsonrpc,
			method: 'call',
			params: [customSid || this.sid(), action, method, data]
		};
		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), 15000);
		return fetch(this.url,
			{ method: 'POST', body: JSON.stringify(body), signal: controller.signal })
			.then(response => response.json())
			.then(parseResult)
			.finally(clearTimeout(id));
	}

	login(username, password) {
		const data = { username, password, timeout: DEFAULT_SESSION_TIMEOUT };
		return this.call('session', 'login', data, UNAUTH_SESSION_ID)
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
