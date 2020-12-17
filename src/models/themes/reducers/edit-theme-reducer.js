import * as actionTypes from '../types.js';

const INITIAL_STATE = {
  data: {},
  isLoading: false,
  isloaded: false,
  error: '',
};

export const editThemeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.EDITING_THEME_STARTED: 
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.EDITING_THEME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.theme,
      };
    case actionTypes.EDITING_THEME_FAILED:
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