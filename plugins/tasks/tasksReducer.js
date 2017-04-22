import {
  TASKS_GET,
  TASKS_GET_ERROR,
  TASKS_GET_SUCCESS,
  TASKS_SET,
  TASKS_SET_ERROR,
  TASKS_SET_SUCCESS
} from './tasksConstants';

export const initialState = {
  tasks: '',
  loading: false,
  error: false
};

export const reducer = (state = initialState, { type, payload, meta }) => {
  switch (type) {

    case TASKS_GET:
      return Object.assign({}, initialState, {loading: true});

    case TASKS_GET_ERROR:
      return Object.assign({}, initialState, {loading: false, error: true});

    case TASKS_GET_SUCCESS:
      return Object.assign({}, initialState, {loading: false, tasks: payload.notes});

    case TASKS_SET_ERROR:
      return Object.assign({}, initialState, {loading: false, error: true});

    case TASKS_SET:
      return Object.assign({}, state, {loading: true });

    default:
      return state;
  }
};
