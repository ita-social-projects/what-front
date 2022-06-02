import { combineReducers } from 'redux';

import {
  addHomeworkReducer,
  updateHomeworkReducer,
  getHomeworkReducer,
} from './reducers';

export const homeworkReducer = combineReducers({
  homework: getHomeworkReducer,
  updatedHomework: updateHomeworkReducer,
  addedHomework: addHomeworkReducer,
});
