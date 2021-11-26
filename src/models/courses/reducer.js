import { combineReducers } from 'redux';
import { activeCourseReducer, notActiveCourseReducer, createCourseReducer, editCourseReducer, deleteCourseReducer, reactivateCourseReducer } from './reducers';

export const coursesReducer = combineReducers({
  coursesActive: activeCourseReducer,
  coursesNotActive: notActiveCourseReducer,
  editedCourse: editCourseReducer,
  createdCourse: createCourseReducer,
  deletedCourse: deleteCourseReducer,
  reactivatedCourse: reactivateCourseReducer,
})