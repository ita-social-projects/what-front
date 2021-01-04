import { combineReducers } from 'redux';
import {
  allSecretariesReducer, createSecretaryReducer, deleteSecretaryReducer, updateSecretaryReducer,
} from './reducers/index.js';

export const secretariesReducer = combineReducers({
  secretaries: allSecretariesReducer,
  createdSecretary: createSecretaryReducer,
  updatedSecretary: updateSecretaryReducer,
  deletedSecretary: deleteSecretaryReducer,
});