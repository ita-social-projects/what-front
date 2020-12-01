import {
  all, fork, call, put, takeLatest,
} from 'redux-saga/effects';
import {
  CREATE_SECRETARY, DELETE_SECRETARY, GET_SECRETARIES, UPDATE_SECRETARY,
} from './action-types.js';
import {
  secretariesLoadingStarted, secretariesLoadingSuccess, secretariesLoadingFailed,
} from './actions/index.js';

function* createSecretaryWorker() {}

function* getSecretaryWorker() {
  try {
    yield put(secretariesLoadingStarted());
    const secretaries = yield call('https://dp192-what-api.oa.r.appspot.com/api/secretaries');
    yield put(secretariesLoadingSuccess(secretaries));
  } catch (error) {
    yield put(secretariesLoadingFailed(error));
  }
}

function* updateSecretaryWorker() {}

function* deleteSecretaryWorker() {}

export function* createSecretaryWatcher() {
  yield takeLatest(CREATE_SECRETARY, createSecretaryWorker);
}

export function* getSecretariesWatcher() {
  yield takeLatest(GET_SECRETARIES, getSecretaryWorker);
}

export function* updateSecretaryWatcher() {
  yield takeLatest(UPDATE_SECRETARY, updateSecretaryWorker);
}

export function* deleteSecretaryWatcher() {
  yield takeLatest(DELETE_SECRETARY, deleteSecretaryWorker);
}

export function* secretariesWatcher() {
  yield all([
    fork(createSecretaryWatcher),
    fork(getSecretariesWatcher),
    fork(updateSecretaryWatcher),
    fork(deleteSecretaryWatcher),
  ]);
}