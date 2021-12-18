import { combineReducers } from 'redux';
import { studentGroupResultsReducer, studentClassbookReducer, studentResultsReducer, studentsResultsReducer, studentsClassbookReducer } from './reducers/index.js';

export const exportReducer = combineReducers({
  studentGroupResult: studentGroupResultsReducer,
  studentClassbook: studentClassbookReducer,
  studentResultsReducer: studentResultsReducer,
  studentsResults: studentsResultsReducer,
  studentsClassbook: studentsClassbookReducer,
});