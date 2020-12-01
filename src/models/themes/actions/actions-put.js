import { EDITING_THEME_FAILED, EDITING_THEME_STARTED, EDITING_THEME_SUCCESS, EDIT_THEME } from "../types"

export const editTheme = (theme, id) => {
  return {
    type: EDIT_THEME,
    payload: {
      theme,
      id,
    },
  };
};

export const editingThemeStarted = () => {
  return {
    type: EDITING_THEME_STARTED,
  };
};

export const editingThemeSucceed = (themes) => {
  return {
    type: EDITING_THEME_SUCCESS,
    payload: {
      themes,
    },
  };
};

export const editingThemeFailed = (error) => {
  return {
    type: EDITING_THEME_FAILED,
    payload: {
      error: error.message,
    },
  };
};