import * as types from '../types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const attachmentByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_ATTACHMENT_BY_ID_STARTED:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        error: '',
      };

    case types.FETCHING_ATTACHMENT_BY_ID_SUCCEED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
      };

    case types.FETCHING_ATTACHMENT_BY_ID_FAILED:
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
