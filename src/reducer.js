import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer } from './features/index.js';
import { coursesReducer, mentorsReducer } from './models/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
  }),

  models: combineReducers({
    courses: coursesReducer,
    mentors: mentorsReducer,
  }),
});
