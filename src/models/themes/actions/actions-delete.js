import { DELETE_THEME, DELETING_THEME_FAILED, DELETING_THEME_STARTED, DELETING_THEME_SUCCESS } from '../types';

export const deleteTheme = (id) => {
  return {
    type: DELETE_THEME,
    payload: {
      id,
    },
  };
};

export const deletingThemeStarted = () => {
  return {
    type: DELETING_THEME_STARTED,
  };
};

export const deletingThemeSucceed = (themes) => {
  return {
    type: DELETING_THEME_SUCCESS,
    payload: {
      themes,
    },
  };
};

export const deletingThemeFailed = (error) => {
  return {
    type: DELETING_THEME_FAILED,
    payload: {
      error: error.message,
    },
  };
};