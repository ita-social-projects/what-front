import { combineReducers } from 'redux';
import { counterReducer } from './features/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
  }),
});
