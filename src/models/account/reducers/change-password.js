import * as actions from '../types.js';

const initialState = {
  isLoading: false,
  loaded: false,
  error: '',
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHANGE_PASSWORD_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: '',
      };
    case actions.CHANGE_PASSWORD_FAILED:
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