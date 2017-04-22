import epics from './tasksEpics';
import { reducer } from './tasksReducer';
import Tasks from './tasksPage';
import { TasksMenu } from './tasksMenu';
import * as constants from './tasksConstants';


export default {
  name: 'Tasks',
  page: Tasks,
  menu: TasksMenu,
  store: {
    name: 'tasks',
    epics,
    reducer,
    constants
  }
};