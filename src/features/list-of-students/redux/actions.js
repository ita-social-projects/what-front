import types from './action-types.js';

export const setSearchStudentValue = (studentName) => ({
  type: types.SET_SEARCH_STUDENT_VALUE,
  payload: {
    studentName,
  },
});

