import * as actionsTypes from '../types.js';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const addHomeworkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.ADD_HOMEWORK_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionsTypes.ADD_HOMEWORK_FINISHED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.data,
        error: '',
      };
    case actionsTypes.ADD_HOMEWORK_FAILED:
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