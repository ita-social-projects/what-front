import { combineReducers } from 'redux';
import { allThemesReducer, createThemeReducer, editThemeReducer, deleteThemeReducer } from './reducers';

export const themesReducer = combineReducers({
  themes: allThemesReducer,
  createdTheme: createThemeReducer,
  editedTheme: editThemeReducer,
  deletedTheme: deleteThemeReducer,
});