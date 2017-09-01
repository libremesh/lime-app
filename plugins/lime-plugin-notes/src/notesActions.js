import {
  NOTES_GET,
  NOTES_SET
} from './notesConstants';

export const getNotes = () => (dispatch) => {
  dispatch({
    type: NOTES_GET
  });
};

export const setNotes = (notes) => (dispatch) => {
  dispatch({
    type: NOTES_SET,
    payload: { notes }
  });
};