import * as actions from '../types.js';

const initialState = {
  isLoading: false,
  loaded: false,
  error: '',
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PASSWORD_UPDATING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.PASSWORD_UPDATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: '',
      };
    case actions.PASSWORD_UPDATING_FAILED:
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