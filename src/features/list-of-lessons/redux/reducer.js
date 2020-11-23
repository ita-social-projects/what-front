import types from './action-types.js';

const INITIAL_STATE = {
  lessonTheme: '',
  lessonDate: '',
};

export const listOfLessonsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LESSON_THEME_SEARCH_VALUE:
      return {
        ...state,
        lessonTheme: action.payload.lessonThemeName,
      };
    case types.SET_LESSON_DATE:
      return {
        ...state,
        lessonDate: action.payload.lessonThemeDate,
      };
    default:
      return state;
  }
};
