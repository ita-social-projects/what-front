import * as actionTypes from '../types.js';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const deleteThemeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.DELETING_THEME_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.DELETING_THEME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.theme,
      };
    case actionTypes.DELETING_THEME_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    case actionTypes.CLEAR_LOADED:
      return {
        ...state,
        isLoaded: false,
      };
    default: return state;
  }
}