import * as actionTypes from './action-types.js';
import { updateStudentsData, removeStudentFromList } from './helpers.js';

const INITIAL_STATE = {
  allStudents: [],
  currentStudent: null,
  activeStudents: [],
  currentStudentGroups: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const studentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case actionTypes.LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error.message,
      };

    case actionTypes.LOADING_STUDENTS_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        allStudents: action.payload.data,
      };

    case actionTypes.LOADING_BY_ID_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        currentStudent: action.payload.data,
      };

    case actionTypes.LOADING_ACTIVE_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        activeStudents: action.payload.data,
      };

    case actionTypes.LOADING_STUDENT_GROUPS_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        currentStudentGroups: action.payload.data,
      };

    case actionTypes.ADDING_STUDENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        allStudents: [...state.allStudents, action.payload.data],
        activeStudents: [...state.activeStudents, action.payload.data],
      };

    case actionTypes.EDITING_STUDENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        allStudents: updateStudentsData(state.allStudents, action.payload.data),
        activeStudents: updateStudentsData(state.activeStudents, action.payload.data),
      };

    case actionTypes.REMOVING_STUDENT_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        allStudents: removeStudentFromList(state.allStudents, action.payload.id),
        activeStudents: removeStudentFromList(state.activeStudents, action.payload.id),
      };

    default:
      return state;
  }
};
