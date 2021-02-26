import { combineReducers } from 'redux';
import {
  addHomeworkReducer, EditHomeworkReducer, getHomeworkReducer,
} from './reducers/index.js';

export const homeworkReducer = combineReducers({
  addHomework: addHomeworkReducer,
  editHomework: EditHomeworkReducer,
  getHomework: getHomeworkReducer,
});