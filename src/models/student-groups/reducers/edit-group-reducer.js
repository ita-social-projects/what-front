import * as actionTypes from '../action-types.js';

const INITIAL_STATE = {
  data: [],
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
      };
    case actionTypes.EDITING_STUDENT_GROUP_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: state.data.map((group) => {
          if (group.id === action.payload.id) {
            return action.payload;
          }

          return group.id === action.payload.id ? action.payload : group;
        }),
      };
    case actionTypes.EDITING_STUDENT_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Student Groups editing was failed',
      };
    default:
      return state;
  }
};