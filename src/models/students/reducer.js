import { combineReducers } from 'redux';
import {
  allStudentsReducer, activeStudentsReducer, currentStudentReducer,
  currentStudentGroupReducer, editStudentReducer, addStudentReducer,
  removeStudentReducer, reactivateStudentReducer
} from './reducers/index.js';

export const studentsReducer = combineReducers({
  students: allStudentsReducer,
  activeStudents: activeStudentsReducer,
  studentById: currentStudentReducer,
  studentByIdGroups: currentStudentGroupReducer,
  editStudent: editStudentReducer,
  addStudent: addStudentReducer,
  removeStudent: removeStudentReducer,
  reactivateStudent: reactivateStudentReducer,
});
