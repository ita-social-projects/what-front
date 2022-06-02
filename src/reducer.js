import { combineReducers } from 'redux';
import {
  counterReducer,
  listOfGroupsReducer,
  alertReducer,
} from './features/index.js';

import {
  mentorsReducer,
  themesReducer,
  coursesReducer,
  schedulesReducer,
  studentsReducer,
  lessonsReducer,
  accountReducer,
  secretariesReducer,
  studentGroupsReducer,
  dashboardReducer,
  attachmentsReducer,
  importReducer,
  homeworkReducer,
  eventReducer,
  exportReducer
} from './models/index.js';

export const rootReducer = combineReducers({
  features: combineReducers({
    counter: counterReducer,
    listOfGroups: listOfGroupsReducer,
    alert: alertReducer,
  }),
  models: combineReducers({
    users: accountReducer,
    courses: coursesReducer,
    lessons: lessonsReducer,
    students: studentsReducer,
    mentors: mentorsReducer,
    schedules: schedulesReducer,
    themes: themesReducer,
    secretaries: secretariesReducer,
    studentGroups: studentGroupsReducer,
    dashboard: dashboardReducer,
    attachments: attachmentsReducer,
    import: importReducer,
    homework: homeworkReducer,
    events: eventReducer,
    export: exportReducer,
  }),
});
