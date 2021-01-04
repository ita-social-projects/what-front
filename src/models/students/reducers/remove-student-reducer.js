import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const removeStudentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.REMOVING_STUDENT_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case actionTypes.REMOVING_STUDENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };

    case actionTypes.REMOVING_STUDENT_FAILED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      }
    default:
      return state;
  }
};
