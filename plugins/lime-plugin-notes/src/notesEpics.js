import { getNotes, setNotes } from './notesApi';

import { ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
	NOTES_GET,
	NOTES_GET_SUCCESS,
	NOTES_GET_ERROR,
	NOTES_SET,
	NOTES_SET_SUCCESS,
	NOTES_SET_ERROR
} from './notesConstants';

const getNotesEpic = ( action$, state$, { wsAPI } ) =>
	action$.pipe(
		ofType(...[NOTES_GET,NOTES_SET_SUCCESS]),
		mergeMap(() => getNotes(wsAPI, state$.value.meta.sid)),
		map( notes => ({ type: NOTES_GET_SUCCESS, payload: notes })),
		catchError( error => [({ type: NOTES_GET_ERROR, payload: error })])
	);

const setNotesEpic = ( action$, state$, { wsAPI } ) =>
	action$.pipe(
		ofType(NOTES_SET),
		map(action => action.payload.notes),
		mergeMap((notes) => setNotes(wsAPI, state$.value.meta.sid, { text: notes }).pipe(
			map( notes => ({ type: NOTES_SET_SUCCESS, payload: notes })),
			catchError( error => [({ type: NOTES_SET_ERROR, payload: error })])
		))
	);

export default { getNotesEpic, setNotesEpic };