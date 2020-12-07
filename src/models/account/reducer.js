import { combineReducers } from 'redux';
import {
  loginReducer, unAssignedReducer, usersListreducer,
} from './reducers/index.js';

export const accountReducer = combineReducers({
  currentUser: loginReducer,
  unAssignedlist: unAssignedReducer,
  usersList: usersListreducer,
});