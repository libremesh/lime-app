import {
	NOTES_GET,
	NOTES_GET_ERROR,
	NOTES_GET_SUCCESS,
	NOTES_SET,
	NOTES_SET_ERROR
} from './notesConstants';

export const initialState = {
	notes: '',
	loading: false,
	error: false
};

export const reducer = (state = initialState, { type, payload, meta }) => {
	switch (type) {

		case NOTES_GET:
			return Object.assign({}, initialState, { loading: true });

		case NOTES_GET_ERROR:
			return Object.assign({}, initialState, { loading: false, error: true });

		case NOTES_GET_SUCCESS:
			return Object.assign({}, initialState, { loading: false, notes: payload.notes });

		case NOTES_SET_ERROR:
			return Object.assign({}, initialState, { loading: false, error: true });

		case NOTES_SET:
			return Object.assign({}, state, { loading: true });

		default:
			return state;
	}
};
