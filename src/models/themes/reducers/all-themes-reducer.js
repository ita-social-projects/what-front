import * as actionTypes from '../types.js';

const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isLoaded: false,
  error: '',
};

export const allThemesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOADING_THEMES_STARTED:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case actionTypes.LOADING_THEMES_SUCCESS: 
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        data: action.payload.themes,
        error: '',
      };
    case actionTypes.LOADING_THEMES_FAILED:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.payload.error,
      };
    default: return state;
  }
}