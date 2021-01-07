import * as actions from '../types.js';

const initialState = {
  isLoading: false,
  isloaded: false,
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
        isloaded: true,
        error: '',
      };
    case actions.NEW_PASSWORD_CREATING_FAILED:
      return {
        ...state,
        isLoading: false,
        isloaded: false,
        error: action.payload.error.message,
      };
    case actions.CLEAR_LOADED:
      return {
        ...state,
        isloaded: false,
      };
    default: return state;
  }
};