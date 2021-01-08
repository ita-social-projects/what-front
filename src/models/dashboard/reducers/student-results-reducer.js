import * as actionTypes from '../types';

const INITIAL_STATE = {
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const studentResultsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATING_STUDENT_RESULTS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.CREATING_STUDENT_RESULTS_FINISHED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
    case actionTypes.CREATING_STUDENT_RESULTS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    default: return state;
  }
};