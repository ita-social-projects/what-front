import { all, fork } from 'redux-saga/effects';

import { watchFetchCounter, watchAddAlert } from '@/features';
import {
  mentorsWatcher, themesWatcher, coursesWatcher,
  schedulesWatcher, studentsWatcher, lessonsWatcher,
  authWatcher, secretariesWatcher, studentGroupsWatcher,
  dashboardWatcher, attachmentsWatcher,
} from './models/index.js';

export function* rootSaga() {
  yield all([
    fork(watchFetchCounter),
    fork(authWatcher),
    fork(mentorsWatcher),
    fork(coursesWatcher),
    fork(studentsWatcher),
    fork(schedulesWatcher),
    fork(themesWatcher),
    fork(lessonsWatcher),
    fork(secretariesWatcher),
    fork(studentGroupsWatcher),
    fork(watchAddAlert),
    fork(dashboardWatcher),
    fork(attachmentsWatcher),
  ]);
}
