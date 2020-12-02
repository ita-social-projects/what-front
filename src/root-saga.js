import { all, fork } from 'redux-saga/effects';
import { watchFetchCounter } from './features/counter/redux/index.js';
import { watchFetchMentors, watchFetchGroups, watchFetchStudents } from './features/add-lesson/redux/index.js';

export function* rootSaga() {
  yield all([
    fork(watchFetchCounter),
    fork(watchFetchMentors),
    fork(watchFetchGroups),
    fork(watchFetchStudents),
  ]);
}
