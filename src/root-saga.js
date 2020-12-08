import { all, fork } from 'redux-saga/effects';
import { watchFetchCounter } from './features/counter/redux/index.js';
import {
  mentorsSaga, themesWatcher, coursesWatcher,
  schedulesWatcher, studentsWatcher, lessonsWatcher,
  authWatcher, secretariesWatcher,
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
  ]);
}
