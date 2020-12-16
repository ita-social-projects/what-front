import { combineReducers } from 'redux';
import {
  allLessonsReducer, addLessonReducer, editLessonReducer,
} from './reducers/index.js';

export const lessonsReducer = combineReducers({
  lessons: allLessonsReducer,
  addLesson: addLessonReducer,
  editLesson: editLessonReducer,
});

