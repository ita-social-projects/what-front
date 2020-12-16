import * as types from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const mentorAddingReducer = (state = initialState, action) => {
  switch (action.type) {
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
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
      };
    
    case types.ADDING_MENTOR_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error.message,
      };
    
    default:
      return state;
  }
};
