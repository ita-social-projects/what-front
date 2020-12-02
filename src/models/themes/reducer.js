import * as actionTypes from './types.js'

const initialState = {
  data: null,
  isLoading: false,
  loaded: false,
  error: '',
}

export function themesReducer(state = initialState, action) {
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
      loaded: true,
      data: action.payload.themes,
    };
  case actionTypes.LOADING_THEMES_FAILED:
    return {
      ...state,
      isLoading: false,
      loaded: false,
      error: action.payload.error,
    };
  case actionTypes.CREATING_THEME_STARTED:
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  case actionTypes.CREATING_THEME_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      loaded: true,
      data: state.data.concat([action.payload.theme])
    };
  case actionTypes.CREATING_THEME_FAILED:
    return {
      ...state,
      isLoading: false,
      loaded: false,
      error: action.payload.error,
    };
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
      loaded: true,
      data: state.data.map((theme) => (theme.id === action.payload.theme.id
      ? action.payload.theme : theme)),
    };
  case actionTypes.EDITING_THEME_FAILED:
    return {
      ...state,
      isLoading: false,
      loaded: false,
      error: action.payload.error,
    };
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
      loaded: true,
      data: state.data.filter((theme) => theme.id !== action.payload.theme.id),
    };
  case actionTypes.DELETING_THEME_FAILED:
    return {
      ...state,
      isLoading: false,
      loaded: false,
      error: action.payload.error,
    };
    default: return state
  }
}