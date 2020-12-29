import * as actions from '../types.js';

const initialState = {
  isLoading: false,
  loaded: false,
  error: '',
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.NEW_PASSWORD_CREATING_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actions.NEW_PASSWORD_CREATING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: '',
      };
    case actions.NEW_PASSWORD_CREATING_FAILED:
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