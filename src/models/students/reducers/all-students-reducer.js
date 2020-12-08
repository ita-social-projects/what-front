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
        error: action.payload.error.message,
      };

    case actionTypes.ADDING_STUDENT_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case actionTypes.ADDING_STUDENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: [...state.data, action.payload.data],
      };

    case actionTypes.ADDING_STUDENT_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error.message,
      };

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
        data: state.data.filter((student) => student.id !== action.payload.id),
      };

    case actionTypes.REMOVING_STUDENT_FAILED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    default:
      return state;
  }
};
