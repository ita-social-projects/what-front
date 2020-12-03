import * as actionsTypes from './action-types.js';

export const loadMentors = () => ({
  type: actionsTypes.LOAD_MENTORS,
});

export const loadingMentorsStarted = () => ({
  type: actionsTypes.LOADING_MENTORS_STARTED,
});

export const loadingMentorsSucceed = (data) => ({
  type: actionsTypes.LOADING_MENTORS_SUCCESS,
  payload: {
    data,
  },
});

export const loadingMentorsFailed = (error) => ({
  type: actionsTypes.LOADING_MENTORS_FAILED,
  payload: {
    error: error.message,
  },
});
