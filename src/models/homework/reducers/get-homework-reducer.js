import * as actionsTypes from '../types.js';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const getHomeworkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.LOADING_HOMEWORK_STARTED_BY_ID:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionsTypes.LOADING_HOMEWORK_FINISHED_BY_ID:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.data,
        error: '',
      };
    case actionsTypes.LOADING_HOMEWORK_FAILED_BY_ID:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionsTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    case actionsTypes.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};