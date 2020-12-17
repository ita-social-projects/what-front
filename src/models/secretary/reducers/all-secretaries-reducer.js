import * as actions from '../action-types.js';

const initialState = {
  data: [],
  isLoading: false,
  loaded: false,
  error: '',
};

export const allSecretariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SECRETARIES_LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARIES_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: action.payload.secretaries,
        error: '',
      };
    case actions.SECRETARIES_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: action.payload.error.message,
      };
    case actions.CLEAR_LOADED:
      return {
        ...state,
        loaded: false,
      };
    default: return state;
  }
};