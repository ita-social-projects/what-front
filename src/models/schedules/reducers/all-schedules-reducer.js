import * as actionTypes from '../types.js';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const allSchedulesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_SCHEDULES_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };
    case actionTypes.LOADING_SCHEDULES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.schedules
      };
    case actionTypes.LOADING_SCHEDULES_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
}