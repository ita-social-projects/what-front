import * as actionTypes from '../types';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  loaded: false,
  error: '',
};

export const updateHomeworkStudentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.UPDATING_HOMEWORK_STUDENT_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.UPDATING_HOMEWORK_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.homeworkStudent,
        error: '',
      };
    case actionTypes.UPDATING_HOMEWORK_STUDENT_FAILED:
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
