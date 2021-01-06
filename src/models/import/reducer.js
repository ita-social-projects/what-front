import { combineReducers } from 'redux';
import { groupsReducer, studentsReducer, themesReducer } from './reducers';

export const importReducer = combineReducers({
  groups: groupsReducer,
  students: studentsReducer,
  themes: themesReducer,
});

