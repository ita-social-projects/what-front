import { combineReducers } from 'redux';
import {
  attachmentsAllReducer,
  attachmentByIdReducer,
  attachmentsAllCreateReducer,
  attachmentDeleteReducer
} from './reducers/index.js';

export const attachmentsReducer = combineReducers({
  attachments: attachmentsAllReducer,
  attachmentById: attachmentByIdReducer,
  attachmentsCreating: attachmentsAllCreateReducer,
  attachmentDeleting: attachmentDeleteReducer
});