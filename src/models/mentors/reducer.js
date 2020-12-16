import { combineReducers } from 'redux';
import {
  mentorsAllReducer, mentorsActiveReducer, mentorCurrentReducer, mentorGroupsReducer, mentorCoursesReducer
} from './reducers/index.js';


export const mentorsReducer = combineReducers({
  mentors: mentorsAllReducer,
  mentorsActive: mentorsActiveReducer,
  mentorById: mentorCurrentReducer,
  mentorByIdGroups: mentorGroupsReducer,
  mentorByIdCourses: mentorCoursesReducer,
});
