import * as types from './types.js';
import { updateMentor, deleteMentor } from './helper-functions.js';

const initialState = {
  data: [],
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
        data: action.payload.mentors,
      };
    case types.ADDING_MENTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: state.data ? [...state.data, action.payload.mentor] : null,
      };
    case types.EDITING_MENTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: updateMentor(state.mentor, action.payload.mentor),
      };
    case types.DELETING_MENTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: deleteMentor(state.data, action.payload.id),
      };
    default:
      return state;
  }
};
