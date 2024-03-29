import * as types from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mentorReactivatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REACTIVATING_MENTOR_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case types.REACTIVATING_MENTOR_SUCCEED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
      };

    case types.REACTIVATING_MENTOR_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };

    case types.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    default:
      return state;
  }
};
