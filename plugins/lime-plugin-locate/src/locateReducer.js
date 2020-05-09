import {
	LOCATION_LOAD_SUCCESS,
	LOCATION_LOAD_LINKS_SUCCESS,
	LOCATION_CHANGE_SUCCESS,
	LOCATION_CHANGE,
	LOCATION_USER_SET,
	LOCATION_TOOGLE_EDIT,
} from './locateConstants';


export const initialState = {
	station: undefined,
	user: {
		lon: 0,
		lat: 0
	},
	submitting: false,
	isCommunity: false,
	nodeshash: []
};


export const reducer = (state = initialState, { type, payload, meta }) => {
	switch (type) {

		case LOCATION_CHANGE:
			return Object.assign({}, state, {submitting: true, editting: false})

		case LOCATION_CHANGE_SUCCESS:
			return Object.assign({}, state, {submitting: false })

		case LOCATION_LOAD_SUCCESS:
			return Object.assign({}, state, { station: payload.location || payload, isCommunity: payload.default || false });

		case LOCATION_LOAD_LINKS_SUCCESS:
			return Object.assign({}, state, { nodeshash: Object.values(payload || {}).map(x => x.data) });

		case LOCATION_USER_SET:
			return Object.assign({}, state, { user: payload });

		case LOCATION_TOOGLE_EDIT:
			return Object.assign({}, state, { editting: payload});

		default:
			return state;
	}
};
