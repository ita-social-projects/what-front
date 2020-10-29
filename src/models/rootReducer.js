import { combineReducers } from 'redux';
import { testReducer } from '../features/test-component/redux/test-reducer';

export const rootReducer = combineReducers({
  testReducer
});
