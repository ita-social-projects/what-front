import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const loadStudentGroupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_STUDENT_GROUPS_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    case actionTypes.LOADING_STUDENT_GROUPS_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload
      };
    case actionTypes.LOADING_STUDENT_GROUPS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Student Groups loading was failed',
      };
    default: return state;
  }
};