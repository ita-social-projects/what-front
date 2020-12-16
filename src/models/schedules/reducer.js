import { combineReducers } from 'redux';
import { allSchedulesReducer, editScheduleReducer, createScheduleReducer, deleteScheduleReducer } from './reducers';

export const schedulesReducer = combineReducers({
  schedules: allSchedulesReducer,
  editedSchedule: editScheduleReducer,
  createdSchedule: createScheduleReducer,
  deletedSchedule: deleteScheduleReducer,
});
