import types from './action-types.js';

export const setSearchCourseValue = (courseName) => ({
  type: types.SET_SEARCH_VALUE,
  payload: {
    courseName,
  }
});