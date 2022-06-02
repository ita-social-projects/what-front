import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const reactivateStudentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REACTIVATING_STUDENT_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case actionTypes.REACTIVATING_STUDENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };

    case actionTypes.REACTIVATING_STUDENT_FAILED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};
