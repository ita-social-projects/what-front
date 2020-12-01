import { CREATE_THEME, CREATING_THEME_FAILED, CREATING_THEME_STARTED, CREATING_THEME_SUCCESS } from '../types.js';

export const createTheme = (theme) => {
  return {
    type: CREATE_THEME,
    payload: {
      theme,
    },
  };
};

export const creatingThemeStarted = () => {
  return {
    type: CREATING_THEME_STARTED,
  };
};

export const creatingThemeSucceed = (theme) => {
  return {
    type: CREATING_THEME_SUCCESS,
    payload: {
      theme,
    },
  };
};

export const creatingThemeFailed = (error) => {
  return {
    type: CREATING_THEME_FAILED,
    payload: {
      error: error.message,
    },
  };
};