import { all, fork } from 'redux-saga/effects';

import { watchFetchCounter, watchAddAlert } from '@/features';
import {
  mentorsSaga, themesWatcher, coursesWatcher,
  schedulesWatcher, studentsWatcher, lessonsWatcher,
  authWatcher, secretariesWatcher, studentGroupsWatcher,
} from './models/index.js';

export function* rootSaga() {
  yield all([
    fork(watchFetchCounter),
    fork(authWatcher),
    fork(mentorsSaga),
    fork(coursesWatcher),
    fork(studentsWatcher),
    fork(schedulesWatcher),
    fork(themesWatcher),
    fork(lessonsWatcher),
    fork(secretariesWatcher),
    fork(studentGroupsWatcher),
    fork(watchAddAlert),
  ]);
}
