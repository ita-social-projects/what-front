import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer } from './features/index.js';
import { mentorsModelReducer } from './models/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
  }),
  
  models: combineReducers({
    mentorsModel: mentorsModelReducer,
  }),
});
