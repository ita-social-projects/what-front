import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer, addLessonReducer } from './features/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
    addLesson: addLessonReducer,
  }),
});
