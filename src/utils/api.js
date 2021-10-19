import api from 'utils/uhttpd.service';
import { DEFAULT_COMMUNITY_SETTINGS } from 'utils/constants';

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

export function getBoardData() {
	return api.call('system', 'board', {});
}

export function getSession() {
	return api.call('session', 'get', {ubus_rpc_session: api.sid()})
		.then(res => res.values);
}

export function getCommunitySettings() {
	return api.call('lime-utils', 'get_community_settings', {})
		.then(res => ({...res, DEFAULT_COMMUNITY_SETTINGS }))
		.catch(() => DEFAULT_COMMUNITY_SETTINGS);
}

export function reboot() {
	return api.call('system', 'reboot', {}).then(() => true);
}
