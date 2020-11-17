import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer } from './features';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
  }),
});
