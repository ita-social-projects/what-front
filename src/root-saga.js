import { all, fork } from 'redux-saga/effects';

import { watchFetchCounter } from './features/counter/redux/index.js';
import { authWatcher, loadMentorsWatcher } from './models/index.js';
import {
  mentorsSaga, themesWatcher, coursesWatcher, schedulesWatcher, studentsWatcher,lessonsWatcher
} from './models/index.js';

export function* rootSaga() {
  yield all([
    fork(watchFetchCounter),
    fork(loadMentorsWatcher),
    fork(authWatcher),
    fork(mentorsSaga),
    fork(coursesWatcher),
    fork(studentsWatcher),
    fork(schedulesWatcher),
    fork(themesWatcher),
    fork(lessonsWatcher),
  ]);
}
