import types from './action-types.js';

export const setSearchLessonTheme = (lessonThemeName) => ({
  type: types.SET_LESSON_THEME_SEARCH_VALUE,
  payload: {
    lessonThemeName,
  },
});

export const setSearchLessonDate = (lessonThemeDate) => ({
  type: types.SET_LESSON_DATE,
  payload: {
    lessonThemeDate,
  },
});