import * as actionTypes from './action-types.js';

const INITIAL_STATE = {
  studentGroupById: {},
  studentGroups: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const studentGroupsReducer = (state = INITIAL_STATE, action) => {
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
        studentGroups: action.payload,
      };
    case actionTypes.ADDING_STUDENT_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Adding Student Group was failed',
      };
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
        studentGroupById: { ...state.studentGroupById, ...action.payload },
      };
    case actionTypes.LOADING_BY_ID_STUDENT_GROUP_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Student Groups loading by id was failed',
      };
    case actionTypes.LOADING_STUDENT_GROUP_STARTED:
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
        studentGroups: [...state.studentGroups, ...action.payload],
      };
    case actionTypes.LOADING_STUDENT_GROUPS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: 'Student Groups loading was failed',
      };
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
        studentGroups: state.studentGroups.map((group) => {
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
