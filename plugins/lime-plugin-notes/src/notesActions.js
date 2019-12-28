import {
	NOTES_GET,
	NOTES_SET
} from './notesConstants';

export const getNotes = () => ({
	type: NOTES_GET
});

export const setNotes = (notes) => ({
	type: NOTES_SET,
	payload: { notes }
});
