import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  group: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const loadStudentGroupByIdReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_BY_ID_STUDENT_GROUP_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    case actionTypes.LOADING_BY_ID_STUDENT_GROUP_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        group: { ...state.group, ...action.payload },
      };
    case actionTypes.LOADING_BY_ID_STUDENT_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Student Groups loading by id was failed',
      };
    default: return state;
  }
};