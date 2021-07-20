import api from 'utils/uhttpd.service';

export function getBatHost(mac, outgoingIface) {
	return api.call('bat-hosts', 'get_bathost', {mac, outgoing_iface: outgoingIface})
		.then(response => new Promise((res, rej) => {
			if (response.status === 'ok') {
				res(response.bathost);
			}
			else {
				rej(response.message);
			}
		}))
}

export function checkInternet() {
	return api.call('check-internet', 'is_connected', {});
}
