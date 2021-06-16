import { combineReducers } from 'redux';
import {
  allLessonsReducer, addLessonReducer, editLessonReducer, studentLessonsReducer, loadLessonByIdReducer
} from './reducers/index.js';

export const lessonsReducer = combineReducers({
  lessons: allLessonsReducer,
  studentLessons: studentLessonsReducer,
  lessonById: loadLessonByIdReducer,
  addLesson: addLessonReducer,
  editLesson: editLessonReducer,
});

