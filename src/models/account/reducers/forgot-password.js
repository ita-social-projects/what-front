import * as actions from '../types.js';

const initialState = {
  data: {},
  isLoading: false,
  isloaded: false,
  error: '',
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FORGOT_PASSWORD_REQUEST_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
        isLoaded: true,
        error: '',
      };
    case actions.FORGOT_PASSWORD_REQUEST_FAILED:
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
