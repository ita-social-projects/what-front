import { combineReducers } from 'redux';
import {
  loginReducer, unAssignedReducer, usersListreducer, registReducer, changePasswordReducer,
} from './reducers/index.js';

export const accountReducer = combineReducers({
  currentUser: loginReducer,
  unAssignedlist: unAssignedReducer,
  usersList: usersListreducer,
  registration: registReducer,
  changePassword: changePasswordReducer,
});