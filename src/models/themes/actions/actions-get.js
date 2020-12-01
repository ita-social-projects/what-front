import { GET_THEMES, LOADING_THEMES_FAILED, LOADING_THEMES_STARTED, LOADING_THEMES_SUCCESS } from '../types';

export const getThemes = () => {
  return {
    type: GET_THEMES,
  };
};

export const loadingThemesStarted = () => {
  return {
    type: LOADING_THEMES_STARTED,
  };
};

export const loadingThemesSucceed = (data) => {
  return {
    type: LOADING_THEMES_SUCCESS,
    payload: {
      data,
    },
  };
};

export const loadingThemesFailed = (error) => {
  return {
    type: LOADING_THEMES_FAILED,
    payload: {
      error: error.message,
    },
  };
};