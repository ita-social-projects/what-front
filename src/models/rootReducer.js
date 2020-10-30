import { combineReducers } from 'redux';
import { testReducer } from '../features/test-feature/redux/test-reducer';

export const rootReducer = combineReducers({
  testReducer
});
