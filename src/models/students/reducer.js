import { combineReducers } from 'redux';
import {
  allStudentsReducer, activeStudentsReducer, currentStudentReducer,
  currentStudentGroupReducer, editStudentReducer, addStudentReducer,
  removeStudentReducer,
} from './reducers/index.js';

export const studentsReducer = combineReducers({
  students: allStudentsReducer,
  activeStudents: activeStudentsReducer,
  studentById: currentStudentReducer,
  studentByIdGroups: currentStudentGroupReducer,
  editStudent: editStudentReducer,
  addStudent: addStudentReducer,
  removeStudent: removeStudentReducer,
});
