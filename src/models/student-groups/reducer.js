import { combineReducers } from 'redux';
import {
  addStudentGroupReducer,
  editStudentGroupReducer,
  loadStudentGroupByIdReducer,
  loadStudentGroupsReducer,
  loadStudentGroupHomeworksReducer,
} from './reducers/index.js';

export const studentGroupsReducer = combineReducers({
  addStudentGroup: addStudentGroupReducer,
  editStudentGroup: editStudentGroupReducer,
  loadStudentGroupById: loadStudentGroupByIdReducer,
  loadStudentGroups: loadStudentGroupsReducer,
  loadStudentGroupHomeworks: loadStudentGroupHomeworksReducer,
});
