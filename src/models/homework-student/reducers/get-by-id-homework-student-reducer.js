import * as actionTypes from '../types';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  loaded: false,
  error: '',
};

export const getHomeworkByIdStudentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_HOMEWORK_STUDENT_BY_ID_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOADING_HOMEWORK_STUDENT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.homeworkStudent,
        error: '',
      };
    case actionTypes.LOADING_HOMEWORK_STUDENT_BY_ID_FAILED:
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
