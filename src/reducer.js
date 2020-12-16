import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer } from './features/index.js';
import {
  mentorsReducer, themesReducer, coursesReducer,
  schedulesReducer, studentsReducer, lessonsReducer,
  accountReducer, secretariesReducer, studentGroupsReducer,
} from './models/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
  }),
  models: combineReducers({
    users: accountReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
    students: studentsReducer,
    mentors: mentorsReducer,
    schedules: schedulesReducer,
    themes: themesReducer,
    secretaries: secretariesReducer,
    studentGroups: studentGroupsReducer,
  }),
});
