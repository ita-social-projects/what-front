import { DELETE_THEME, DELETING_THEME_FAILED, DELETING_THEME_STARTED, DELETING_THEME_SUCCESS } from "../types"

export const deleteTheme = () => {
  return {
    type: DELETE_THEME,
  };
};

export const delitingThemeStarted = () => {
  return {
    type: DELETING_THEME_STARTED,
  };
};

export const delitingThemeSucceed = (themes) => {
  return {
    type: DELETING_THEME_SUCCESS,
    payload: {
      themes,
    },
  };
};

export const delitingThemeFailed = (error) => {
  return {
    type: DELETING_THEME_FAILED,
    payload: {
      error,
    },
  };
};