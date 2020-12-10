import { all, fork } from 'redux-saga/effects';

import { watchFetchCounter } from './features/counter/redux/index.js';
import {
  mentorsWatcher, themesWatcher, coursesWatcher,
  schedulesWatcher, studentsWatcher, lessonsWatcher,
  authWatcher, secretariesWatcher, studentGroupsWatcher,
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
  ]);
}
