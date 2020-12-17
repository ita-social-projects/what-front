import * as actionTypes from '../types.js'

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const createScheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CREATING_SCHEDULE_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };
    case actionTypes.CREATING_SCHEDULE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.schedule,
      };
    case actionTypes.CREATING_SCHEDULE_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false
      };
    default: return state;
  }
}