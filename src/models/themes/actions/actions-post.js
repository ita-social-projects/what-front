import { CREATE_THEME, CREATING_THEME_FAILED, CREATING_THEME_STARTED, CREATING_THEME_SUCCESS } from "../types"

export const createTheme = () => {
  return {
    type: CREATE_THEME,
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
      error,
    },
  };
};