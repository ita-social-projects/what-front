import * as types from './types.js';
import { updateMentor, deleteMentor } from './helper-functions.js';

const initialState = {
  mentors: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mentorsModelReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };
    case types.LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error.message,
      };
    case types.FETCHING_MENTORS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        mentors: action.payload.mentors,
      };
    case types.ADDING_MENTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        mentors: state.mentors ? [...state.mentors, action.payload.data] : null,
      };
    case types.EDITING_MENTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        mentors: updateMentor(state.mentor, action.payload.data),
      };
    case types.DELETING_MENTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        mentors: deleteMentor(state.mentors, action.payload.id),
      };
    default:
      return state;
  }
};
