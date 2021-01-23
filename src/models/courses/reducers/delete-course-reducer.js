import * as actionTypes from '../types.js';

const INITIAL_STATE = {
  isLoading: false,
  isLoaded: false,
  error: '',
}; 

export const deleteCourseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.DELETING_COURSE_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.DELETING_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
    case actionTypes.DELETING_COURSE_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false
      }
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default: return state;
  }
};
