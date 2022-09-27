import { ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";

import { getNotes, setNotes } from "./notesApi";
import {
    NOTES_GET,
    NOTES_GET_ERROR,
    NOTES_GET_SUCCESS,
    NOTES_SET,
    NOTES_SET_ERROR,
    NOTES_SET_SUCCESS,
} from "./notesConstants";

const getNotesEpic = (action$, _state$, { wsAPI }) =>
    action$.pipe(
        ofType(...[NOTES_GET, NOTES_SET_SUCCESS]),
        mergeMap(() => getNotes(wsAPI)),
        map((notes) => ({ type: NOTES_GET_SUCCESS, payload: notes })),
        catchError((error) => [{ type: NOTES_GET_ERROR, payload: error }])
    );

const setNotesEpic = (action$, _state$, { wsAPI }) =>
    action$.pipe(
        ofType(NOTES_SET),
        map((action) => action.payload.notes),
        mergeMap((notes) =>
            setNotes(wsAPI, { text: notes }).pipe(
                map((notes) => ({ type: NOTES_SET_SUCCESS, payload: notes })),
                catchError((error) => [
                    { type: NOTES_SET_ERROR, payload: error },
                ])
            )
        )
    );

export default { getNotesEpic, setNotesEpic };
