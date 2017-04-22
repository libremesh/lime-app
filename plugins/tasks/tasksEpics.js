import { getTasks, setTasks } from './tasksApi';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
  TASKS_GET,
  TASKS_GET_SUCCESS,
  TASKS_SET,
  TASKS_SET_SUCCESS,
  TASKS_SET_ERROR
} from './tasksConstants';

const getTasksEpic = ( action$, { getState}, { wsAPI } ) =>
  action$.ofType(...[TASKS_GET,TASKS_SET_SUCCESS])
    .mergeMap(() => getTasks(wsAPI, getState().meta.sid))
      .map( tasks => ({ type: TASKS_GET_SUCCESS, payload: tasks }));

const setTasksEpic = ( action$, { getState}, { wsAPI } ) =>
  action$.ofType(TASKS_SET)
    .map(action => action.payload.tasks)
    .mergeMap((tasks) => setTasks(wsAPI, getState().meta.sid, {text:tasks})
      .map( tasks => ({ type: TASKS_SET_SUCCESS, payload: tasks }))
      .catch( error => [({ type: TASKS_SET_ERROR, payload: error })])
    );

export default { getTasksEpic, setTasksEpic };