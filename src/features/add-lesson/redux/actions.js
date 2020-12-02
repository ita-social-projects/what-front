import * as actions from './action-types.js';

export const fetchStudents = () => ({
  type: actions.FETCH_STUDENTS,
});

export const fetchGroups = () => ({
  type: actions.FETCH_GROUPS,
});

export const fetchMentors = () => ({
  type: actions.FETCH_MENTORS,
});

export const fetchingGroupsStart = () => ({
  type: actions.GROUPS_LOADING_STARTED,
});

export const fetchingGroupsEnd = ({ data }) => ({
  type: actions.GROUPS_LOADING_FINISHED,
  payload: {
    data,
  },
});

export const fetchGroupsFailed = (error) => ({
  type: actions.GROUPS_LOADING_FAILED,
  payload: {
    error,
  },
});

export const fetchingMentorsStart = () => ({
  type: actions.MENTORS_LOADING_STARTED,
});

export const fetchingMentorsEnd = ({ data }) => ({
  type: actions.MENTORS_LOADING_FINISHED,
  payload: {
    data,
  },
});

export const fetchMentorsFailed = (error) => ({
  type: actions.MENTORS_LOADING_FAILED,
  payload: {
    error,
  },
});

export const fetchingStudentsStart = () => ({
  type: actions.STUDENTS_LOADING_STARTED,
});

export const fetchingStudentsEnd = ({ data }) => ({
  type: actions.STUDENTS_LOADING_FINISHED,
  payload: {
    data,
  },
});

export const fetchStudentsFailed = (error) => ({
  type: actions.STUDENTS_LOADING_FAILED,
  payload: {
    error,
  },
});
