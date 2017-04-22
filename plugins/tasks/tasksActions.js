import {
  TASKS_GET,
  TASKS_SET
} from './tasksConstants';

export const getTasks = () => (dispatch) => {
  dispatch({
    type: TASKS_GET
  });
};

export const setTasks = (tasks) => (dispatch) => {
  dispatch({
    type: TASKS_SET,
    payload: { tasks }
  });
};