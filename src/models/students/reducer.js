import { combineReducers } from 'redux';
import {
  allStudentsReducer, activeStudentsReducer, currentStudentReducer, currentStudentGroupReducer,
} from './reducers/index.js';

export const studentsReducer = combineReducers({
  students: allStudentsReducer,
  activeStudents: activeStudentsReducer,
  studentById: currentStudentReducer,
  studentByIdGroups: currentStudentGroupReducer,
});
