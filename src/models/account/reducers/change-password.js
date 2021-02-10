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
        isLoaded: true,
        error: '',
      };
    case actions.NEW_PASSWORD_CREATING_FAILED:
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
