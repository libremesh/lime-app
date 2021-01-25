import api from 'utils/uhttpd.service';

export function getSession() {
	return api.call("tmate", "get_session", {}).toPromise()
		.then(result => result.session !== 'no session' ? result.session : null)
}

export function openSession() {
	return api.call("tmate", "open_session", {}).toPromise()
}

export function closeSession() {
	return api.call("tmate", "close_session", {}).toPromise()
}
