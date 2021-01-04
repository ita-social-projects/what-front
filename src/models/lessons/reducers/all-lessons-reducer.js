import * as actionsTypes from '../action-types.js';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const allLessonsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.LOADING_LESSONS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionsTypes.LOADING_LESSONS_FINISHED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.data,
        error: '',
      };
    case actionsTypes.LOADING_LESSONS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};