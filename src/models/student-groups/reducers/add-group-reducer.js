import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const addStudentGroupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADDING_STUDENT_GROUP_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    case actionTypes.ADDING_STUDENT_GROUP_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload,
      };
    case actionTypes.ADDING_STUDENT_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionTypes.ADD_CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
        error: '',
      };
    case actionTypes.ADD_CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
};
