import * as actions from './action-types.js';

const INITIAL_STATE = {
  isLoading: false,
  error: '',
  mentors: null,
  students: null,
  groups: null,
};

export const addLessonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.STUDENTS_LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case actions.STUDENTS_LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
        students: action.payload.data,
      };
    case actions.STUDENTS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case actions.GROUPS_LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case actions.GROUPS_LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
        groups: action.payload.data,
      };
    case actions.GROUPS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case actions.MENTORS_LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case actions.MENTORS_LOADING_FINISHED:
      return {
        ...state,
        isLoading: false,
        mentors: action.payload.data,
      };
    case actions.MENTORS_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
