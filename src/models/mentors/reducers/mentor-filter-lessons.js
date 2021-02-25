import * as actionTypes from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export function filteredMentorLessonsReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCHING_MENTORS_FILTER_LESSONS_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.FETCHING_MENTORS_FILTER_LESSONS_SUCCEED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.data,
      };
    case actionTypes.FETCHING_MENTORS_FILTER_LESSONS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
}