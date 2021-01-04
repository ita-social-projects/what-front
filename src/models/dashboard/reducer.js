import { combineReducers } from 'redux';
import {
  studentGroupResultsReducer,
  studentClassbookReducer,
  studentResultsReducer,
  studentsResultsReducer,
  studentsClassbookReducer,
} from './reducers/index.js';

export const dashboardReducer = combineReducers({
  postStudentGroupResult: studentGroupResultsReducer,
  postStudentClassbook: studentClassbookReducer,
  postStudentResultsReducer: studentResultsReducer,
  postStudentsResults: studentsResultsReducer,
  postStudentsClassbook: studentsClassbookReducer,
});