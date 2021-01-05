import * as types from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const attachmentsAllCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATING_ATTACHMENTS_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case types.CREATING_ATTACHMENTS_SUCCEED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
      };

    case types.CREATING_ATTACHMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error.message,
      };

    case types.CLEAR_LOADED:
      return {
        ...state,
        loaded: false,
      };
    default:
      return state;
  }
};
