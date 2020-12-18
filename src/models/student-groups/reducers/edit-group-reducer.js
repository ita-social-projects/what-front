import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  group: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const editStudentGroupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.EDITING_STUDENT_GROUP_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case actionTypes.EDITING_STUDENT_GROUP_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        group: action.payload.group,
      };

    case actionTypes.EDITING_STUDENT_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Student Groups editing was failed',
      };

    case actionTypes.EDIT_CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    default:
      return state;
  }
};
