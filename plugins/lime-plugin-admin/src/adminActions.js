import {
	SET_HOSTNAME
} from './adminConstants';

export const changeHostname = (hostname) => ({
	type: SET_HOSTNAME,
	payload: hostname
});
