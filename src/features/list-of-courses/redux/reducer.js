import types from './action-types.js';

const INITIAL_STATE = {
  searchCourseValue: '',
};

export const listOfCoursesReducer = (state = INITIAL_STATE, action) => {
  if (action.type === types.SET_SEARCH_VALUE) {
    return {
      ...state,
      searchCourseValue: action.payload.courseName,
    }
  } else {
    return state;
  }
};