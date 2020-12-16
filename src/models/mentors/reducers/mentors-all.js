import * as types from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mentorsAllReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_MENTORS_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case types.FETCHING_MENTORS_SUCCEED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
      };

    case types.FETCHING_MENTORS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error.message,
      };

    case types.ADDING_MENTOR_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case types.ADDING_MENTOR_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: [...state.data, action.payload.data],
      };

    case types.ADDING_MENTOR_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error.message,
      };

    case types.DELETING_MENTOR_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case types.DELETING_MENTOR_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: state.data.filter((el) => el.id !== action.payload.id),
      };

    case types.DELETING_MENTOR_FAILED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    default:
      return state;
  }
};
