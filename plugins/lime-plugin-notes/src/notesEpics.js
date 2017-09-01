import { getNotes, setNotes } from './notesApi';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
  NOTES_GET,
  NOTES_GET_SUCCESS,
  NOTES_GET_ERROR,
  NOTES_SET,
  NOTES_SET_SUCCESS,
  NOTES_SET_ERROR
} from './notesConstants';

const getNotesEpic = ( action$, { getState}, { wsAPI } ) =>
  action$.ofType(...[NOTES_GET,NOTES_SET_SUCCESS])
    .mergeMap(() => getNotes(wsAPI, getState().meta.sid))
      .map( notes => ({ type: NOTES_GET_SUCCESS, payload: notes }))
      .catch( error => [({ type: NOTES_GET_ERROR, payload: error })]);

const setNotesEpic = ( action$, { getState}, { wsAPI } ) =>
  action$.ofType(NOTES_SET)
    .map(action => action.payload.notes)
    .mergeMap((notes) => setNotes(wsAPI, getState().meta.sid, {text:notes})
      .map( notes => ({ type: NOTES_SET_SUCCESS, payload: notes }))
      .catch( error => [({ type: NOTES_SET_ERROR, payload: error })])
    );

export default { getNotesEpic, setNotesEpic };