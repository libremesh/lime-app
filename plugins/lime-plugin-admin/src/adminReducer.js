import {
	SET_HOSTNAME,
	SET_HOSTNAME_ERROR,
	GET_IP_SUCCESS
} from './adminConstants';

export const initialState = {
	hostname: '',
	loading: false,
	redirect: false,
	error: false,
	ipv4: null
};

function parseIpv4(payload) {
	return payload.ips.filter(x => x.version === "4")[0].address.split('/')[0]
}

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_HOSTNAME:
			return Object.assign({}, state, { hostname: payload, loading: true });
		case SET_HOSTNAME_ERROR:
			return Object.assign({}, state, { loading: false, error: true });
		case GET_IP_SUCCESS:
			return Object.assign({}, state, { ipv4: parseIpv4(payload), redirect: true });
		default:
			return state;
	}
};
