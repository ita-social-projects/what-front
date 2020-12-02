import { combineReducers } from 'redux';
import { counterReducer, listOfGroupsReducer } from './features/index.js';
import { mentorsReducer, schedulesReducer } from './models/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
  }),

  models: combineReducers({
    mentors: mentorsReducer,
    schedules: schedulesReducer,
  }),
});
