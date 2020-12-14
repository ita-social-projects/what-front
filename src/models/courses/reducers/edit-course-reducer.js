import * as actionTypes from '../types.js';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  loaded: false,
  error: '',
}; 

export const editCourseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.EDITING_COURSE_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.EDITING_COURSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.course,
        error: '',
      };
    case actionTypes.EDITING_COURSE_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        loaded: false
      }
    default: return state;
  }
};