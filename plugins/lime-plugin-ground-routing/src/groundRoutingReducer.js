import {
	GROUNDROUTING_GET,
	GROUNDROUTING_GET_ERROR,
	GROUNDROUTING_GET_SUCCESS,
	GROUNDROUTING_SET,
	GROUNDROUTING_SET_ERROR
} from './groundRoutingConstants';

export const initialState = {
	configuration: {},
	loading: false,
	error: false
};

export const reducer = (state = initialState, { type, payload, meta }) => {
	switch (type) {

		case GROUNDROUTING_GET:
			return Object.assign({}, initialState, { loading: true });

		case GROUNDROUTING_GET_ERROR:
			return Object.assign({}, initialState, { loading: false, error: true });

		case GROUNDROUTING_GET_SUCCESS:
			return Object.assign({}, initialState, { loading: false, configuration: payload.config });

		case GROUNDROUTING_SET_ERROR:
			return Object.assign({}, initialState, { loading: false, error: true });

		case GROUNDROUTING_SET:
			return Object.assign({}, state, { loading: true });

		default:
			return state;
	}
};
