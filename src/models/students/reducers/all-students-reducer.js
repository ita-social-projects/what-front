import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const allStudentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_STUDENTS_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case actionTypes.LOADING_STUDENTS_SUCCEED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
      };

    case actionTypes.LOADING_STUDENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
