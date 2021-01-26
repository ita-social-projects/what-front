import { combineReducers } from 'redux';
import { allCoursesReducer, createCourseReducer, editCourseReducer, deleteCourseReducer } from './reducers';

export const coursesReducer = combineReducers({
  courses: allCoursesReducer,
  editedCourse: editCourseReducer,
  createdCourse: createCourseReducer,
  deletedCourse: deleteCourseReducer,
})