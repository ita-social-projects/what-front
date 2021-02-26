import { combineReducers } from 'redux';
import {
  allLessonsReducer, addLessonReducer, editLessonReducer, studentLessonsReducer,
} from './reducers/index.js';

export const lessonsReducer = combineReducers({
  lessons: allLessonsReducer,
  studentLessons: studentLessonsReducer,
  addLesson: addLessonReducer,
  editLesson: editLessonReducer,
});