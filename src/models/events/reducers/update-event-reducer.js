import * as actionTypes from '../types.js';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  loaded: false,
  error: '',
};

export const updateEventReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_UPDATE_EVENT_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOADING_UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.event,
        error: '',
      };
    case actionTypes.LOADING_UPDATE_EVENT_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
