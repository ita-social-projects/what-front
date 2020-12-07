import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer } from './features/index.js';
import {
  mentorsModelReducer, themesReducer, coursesReducer, schedulesReducer, studentsReducer,
} from './models/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
  }),
  models: combineReducers({
    courses: coursesReducer,
    students: studentsReducer,
    mentors: mentorsModelReducer,
    schedules: schedulesReducer,
    themes: themesReducer,
  }),
});
