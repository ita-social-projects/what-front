import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const loadStudentGroupHomeworksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_STUDENT_GROUP_HOMEWORKS_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    case actionTypes.LOADING_STUDENT_GROUP_HOMEWORKS_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload,
      };
    case actionTypes.LOADING_STUDENT_GROUP_HOMEWORKS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
};