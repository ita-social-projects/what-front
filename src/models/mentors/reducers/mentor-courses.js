import * as types from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mentorCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_MENTOR_COURSES_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case types.FETCHING_MENTOR_COURSES_SUCCEED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
      };

    case types.FETCHING_MENTOR_COURSES_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
