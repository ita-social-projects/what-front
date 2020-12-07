import { all, fork } from 'redux-saga/effects';
import { watchFetchCounter } from './features/counter/redux/index.js';
import { loadMentorsWatcher, themesWatcher, coursesWatcher } from './models/index.js';

export function* rootSaga() {
  yield all([
    fork(watchFetchCounter),
    fork(coursesWatcher),
    fork(loadMentorsWatcher),
    fork(themesWatcher),
  ]);
}
