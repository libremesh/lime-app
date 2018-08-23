import {
	GROUNDROUTING_GET,
	GROUNDROUTING_SET
} from './groundRoutingConstants';

export const getGroundRouting = () => (dispatch) => {
	dispatch({
		type: GROUNDROUTING_GET
	});
};

export const setGroundRouting = (config) => (dispatch) => {
	dispatch({
		type: GROUNDROUTING_SET,
		payload: { config }
	});
};