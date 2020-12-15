import { combineReducers } from 'redux';
import { allCoursesReducer, createCourseReducer, editCourseReducer } from './reducers';

export const coursesReducer = combineReducers({
  courses: allCoursesReducer,
  editedCourse: editCourseReducer,
  createdCourse: createCourseReducer,
})