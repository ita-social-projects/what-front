import * as actionTypes from '../types.js';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  loaded: false,
  error: '',
}; 

export const notActiveCourseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_NOT_ACTIVE_COURSES_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOADING_NOT_ACTIVE_COURSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.courses,
        error: '',
      };
    case actionTypes.LOADING_NOT_ACTIVE_COURSES_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
}