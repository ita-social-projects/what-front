import { combineReducers } from 'redux';
import {
  addHomeworkReducer, editHomeworkReducer, getHomeworkReducer,
} from './reducers/index.js';

export const homeworkReducer = combineReducers({
  addHomework: addHomeworkReducer,
  editHomework: editHomeworkReducer,
  getHomework: getHomeworkReducer,
});