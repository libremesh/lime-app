import api from 'utils/uhttpd.service';

export function getHostname(mac) {
	return api.call('lime-utils', 'get_hostname', {mac}).toPromise()
		.then(response => new Promise((res, rej) => {
			if (response.status === 'ok') {
				res(response.hostname);
			}
			else {
				rej(response.message);
			}
		}))
}
