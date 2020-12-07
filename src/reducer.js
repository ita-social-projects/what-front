import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer } from './features/index.js';
import { authReducer } from './models/index.js';
import {
  mentorsModelReducer, themesReducer, coursesReducer, schedulesReducer, studentsReducer,lessonsReducer
} from './models/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
  }),
  models: combineReducers({
    users: authReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
    students: studentsReducer,
    mentors: mentorsModelReducer,
    schedules: schedulesReducer,
    themes: themesReducer,
  }),
});
