import { combineReducers } from 'redux';
import {
  mentorsAllReducer,
  mentorsActiveReducer,
  mentorCurrentReducer,
  mentorGroupsReducer,
  mentorCoursesReducer,
  mentorLessonsReducer,
  filteredMentorLessonsReducer,
  mentorEditingReducer,
  mentorAddingReducer,
  mentorDeletingReducer,
  mentorReactivatingReducer,
} from './reducers/index.js';

export const mentorsReducer = combineReducers({
  mentors: mentorsAllReducer,
  mentorsActive: mentorsActiveReducer,
  mentorById: mentorCurrentReducer,
  mentorByIdGroups: mentorGroupsReducer,
  mentorByIdCourses: mentorCoursesReducer,
  mentorByIdLessosns: mentorLessonsReducer,
  mentorsFiltredLessons: filteredMentorLessonsReducer,
  mentorEditing: mentorEditingReducer,
  mentorAdding: mentorAddingReducer,
  mentorDeleting: mentorDeletingReducer,
  mentorReactivating: mentorReactivatingReducer,
});
