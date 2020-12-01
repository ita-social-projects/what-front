import * as actionTypes from './action-types.js';

export const loadStudents = () => ({
  type: actionTypes.LOAD_STUDENTS,
});

export const loadingStudentsStarted = () => ({
  type: actionTypes.LOADING_STUDENTS_STARTED,
});

export const loadingStudentsSucceed = (data) => ({
  type: actionTypes.LOADING_STUDENTS_SUCCESS,
  payload: { data },
});

export const loadingMentorsFailed = (error) => ({
  type: actionTypes.LOADING_STUDENTS_FAILED,
  payload: { error },
});
