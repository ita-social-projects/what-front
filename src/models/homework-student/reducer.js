import { combineReducers } from 'redux';

import {
  addHomeworkStudentReducer,
  updateHomeworkStudentReducer,
  getHomeworkStudentReducer,
  getHomeworkByIdStudentReducer,
} from './reducers';

export const homeworkStudentReducer = combineReducers({
  homeworkStudent: getHomeworkStudentReducer,
  homeworkByIdStudent: getHomeworkByIdStudentReducer,
  updatedHomeworkStudent: updateHomeworkStudentReducer,
  addedHomeworkStudent: addHomeworkStudentReducer,
});
