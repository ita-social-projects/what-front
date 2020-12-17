import { combineReducers } from 'redux';
import { allSchedulesReducer, editScheduleReducer, createScheduleReducer, 
  deleteScheduleReducer, shedulesByGroupIdReducer 
} from './reducers';

export const schedulesReducer = combineReducers({
  schedules: allSchedulesReducer,
  schedulesByGroupId: shedulesByGroupIdReducer,
  editedSchedule: editScheduleReducer,
  createdSchedule: createScheduleReducer,
  deletedSchedule: deleteScheduleReducer,
});
