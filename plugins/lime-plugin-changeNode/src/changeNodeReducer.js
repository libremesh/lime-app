import {
	LOAD_NEIGHBORS_SUCCESS
} from './metaConstants';


export const initialState = {
	stations: []
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOAD_NEIGHBORS_SUCCESS:
			return Object.assign({}, state, { stations: payload });
		default:
			return state;
	}
};
