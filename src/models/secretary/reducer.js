import { combineReducers } from 'redux';
import {
  allSecretariesReducer, activeSecretariesReducer, createSecretaryReducer,
  deleteSecretaryReducer, updateSecretaryReducer, reactivateSecretaryReducer
} from './reducers/index.js';

export const secretariesReducer = combineReducers({
  secretaries: allSecretariesReducer,
  activeSecretaries: activeSecretariesReducer,
  createdSecretary: createSecretaryReducer,
  updatedSecretary: updateSecretaryReducer,
  deletedSecretary: deleteSecretaryReducer,
  reactivatedSecretary: reactivateSecretaryReducer,
});