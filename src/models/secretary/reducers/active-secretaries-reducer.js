import * as actions from '../action-types.js';

const initialState = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const activeSecretariesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ACTIVE_SECRETARIES_LOADING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.ACTIVE_SECRETARIES_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.data,
        error: '',
      };
    case actions.ACTIVE_SECRETARIES_LOADING_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actions.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    default: return state;
  }
};
