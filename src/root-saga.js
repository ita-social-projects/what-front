import { all, fork } from 'redux-saga/effects';
import { watchFetchCounter } from './features/counter/redux/index.js';
import { loadMentorsWatcher, secretariesWatcher } from './models/index.js';

export function* rootSaga() {
  yield all([
    fork(watchFetchCounter),
    fork(loadMentorsWatcher),
    fork(secretariesWatcher),
  ]);
}
