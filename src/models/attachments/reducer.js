import { combineReducers } from 'redux';
import {
  attachmentsAllReducer,
  attachmentByIdReducer,
  attachmentsAllCreateReducer,
} from './reducers/index.js';

export const attachmentsReducer = combineReducers({
  attachments: attachmentsAllReducer,
  attachmentById: attachmentByIdReducer,
  attachmentsCreating: attachmentsAllCreateReducer,
});
