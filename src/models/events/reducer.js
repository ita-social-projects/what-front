import { combineReducers } from 'redux';

import {
  getEventReducer,
  updateEventReducer,
  deleteEventReducer,
  connectEventReducer,
} from './reducers/index.js';

export const eventReducer = combineReducers({
  getEvent: getEventReducer,
  updateEvent: updateEventReducer,
  deleteEvent: deleteEventReducer,
  connectEvent: connectEventReducer,
});
