import * as actionTypes from './action-types.js';

const INITIAL_STATE = {
  students: null,
  isLoading: false,
  loaded: false,
  error: '',
};

export const studentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_STUDENTS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

    case actionTypes.LOADING_STUDENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        students: action.payload.data,
      };

    case actionTypes.LOADING_STUDENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
