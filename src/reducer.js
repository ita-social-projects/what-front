import { combineReducers } from 'redux';
import {
  counterReducer, listOfStudentsReducer, listOfGroupsReducer, listOfSecretariesReducer,
} from './features/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfStudents: listOfStudentsReducer,
    listOfGroups: listOfGroupsReducer,
    listOfSecretaries: listOfSecretariesReducer,
  }),
});
