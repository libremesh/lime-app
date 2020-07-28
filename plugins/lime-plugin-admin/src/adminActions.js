import {
	SET_CONFIG
} from './adminConstants';

export const changeConfig = (config) => ({
	type: SET_CONFIG,
	payload: config
});
