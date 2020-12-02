import { all, fork } from 'redux-saga/effects';

import { watchFetchCounter } from './features/counter/redux/index.js';
import { studentsSaga, loadMentorsWatcher } from './models/index.js';

export function* rootSaga() {
  yield all([
    fork(watchFetchCounter),
    fork(studentsSaga),
    fork(loadMentorsWatcher),
  ]);
}
