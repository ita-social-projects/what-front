import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer, listOfLessonsReducer } from './features/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
    listOfLessons: listOfLessonsReducer,
  }),
});
