import * as actionsTypes from '../action-types.js';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const editLessonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionsTypes.EDITING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionsTypes.EDITING_FINISHED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.data,
        error: '',
      };
    case actionsTypes.EDITING_FAILED:
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
    default:
      return state;
  }
};