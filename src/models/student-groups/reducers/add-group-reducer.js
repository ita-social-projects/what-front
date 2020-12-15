import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  group: {},
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
        group: action.payload,
      };
    case actionTypes.ADDING_STUDENT_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Adding Student Group was failed',
      };
    default: return state;
  }
};