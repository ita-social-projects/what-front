import * as actions from '../action-types.js';

const initialState = {
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const reactivateSecretaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SECRETARY_REACTIVATING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.SECRETARY_REACTIVATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        erroe: '',
      };
    case actions.SECRETARY_REACTIVATING_FAILED:
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
    case actions.CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default: return state;
  }
};
