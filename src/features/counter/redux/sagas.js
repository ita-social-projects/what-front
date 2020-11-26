import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from './action-types.js';
import { counterFetchingStart, counterFetchingEnd, counterFetchFailed } from './actions.js';
import { fetchCounter } from './heplers.js';

function* fetchCounterAsync() {
  try {
    yield put(counterFetchingStart());
    const counter = yield call(fetchCounter);
    yield put(counterFetchingEnd(counter));
  } catch (error) {
    yield put(counterFetchFailed(error));
  }
}

export function* watchFetchCounter() {
  yield takeEvery(actions.FETCH_COUNTER, fetchCounterAsync);
}
