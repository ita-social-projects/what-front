import { all, fork } from 'redux-saga/effects';
import { watchFetchCounter } from './features/counter/redux/index.js';

export function* rootSaga() {
  yield all([
    fork(watchFetchCounter),
  ]);
}
