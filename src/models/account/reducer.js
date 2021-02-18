import { combineReducers } from 'redux';
import {
  loginReducer, unAssignedReducer, usersListreducer, registReducer, changePasswordReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
} from './reducers/index.js';

export const accountReducer = combineReducers({
  currentUser: loginReducer,
  unAssignedlist: unAssignedReducer,
  usersList: usersListreducer,
  registration: registReducer,
  changePassword: changePasswordReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});