import { CREATING_THEME_FAILED, CREATING_THEME_STARTED, CREATING_THEME_SUCCESS, 
  DELETING_THEME_FAILED, DELETING_THEME_STARTED, DELETING_THEME_SUCCESS, 
  EDITING_THEME_FAILED, EDITING_THEME_STARTED, EDITING_THEME_SUCCESS, 
  LOADING_THEMES_FAILED, LOADING_THEMES_STARTED, LOADING_THEMES_SUCCESS 
} from "./types"

const initialState = {
  themes: null,
  isLoading: false,
  loaded: false,
  error: '',
}

export function themesReducer(state = initialState, action) {
  switch (action.type) {
  case LOADING_THEMES_STARTED:
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  case LOADING_THEMES_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      loaded: true,
      themes: action.payload.data,
    };
  case LOADING_THEMES_FAILED:
    return {
      ...state,
      isLoading: false,
      loaded: false,
      error: action.payload.error,
    };
  case CREATING_THEME_STARTED:
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  case CREATING_THEME_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      loaded: true,
      themes: state.themes.concat([action.payload.theme])
    };
  case CREATING_THEME_FAILED:
    return {
      ...state,
      isLoading: false,
      loaded: false,
      error: action.payload.error,
    };
  case EDITING_THEME_STARTED: 
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  case EDITING_THEME_SUCCESS:
    return {
      ...state,
      isLoading: false,
      loaded: true,
      themes: action.payload.themes,
    };
  case EDITING_THEME_FAILED:
    return {
      ...state,
      isLoading: false,
      loaded: false,
      error: action.payload.error,
    };
  case DELETING_THEME_STARTED:
    return {
      ...state,
      isLoading: true,
      error: '',
    };
  case DELETING_THEME_SUCCESS:
    return {
      ...state,
      isLoading: false,
      loaded: true,
      themes: action.payload.themes,
    };
  case DELETING_THEME_FAILED:
    return {
      ...state,
      isLoading: false,
      loaded: false,
      error: action.payload.error,
    };
    default: return state
  }
}