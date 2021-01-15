import {
  all, fork, call, put, takeLatest, takeEvery,
} from 'redux-saga/effects';
import { ApiService } from '../../shared/api-service/api-service.js';
import * as actions from './action-types.js';
import {
  FETCH_SECRETARIES, FETCH_ACTIVE_SECRETARIES, CREATE_SECRETARY, DELETE_SECRETARY, UPDATE_SECRETARY,
} from './action-types.js';

export const fetchSecretaries = () => ({ type: actions.FETCH_SECRETARIES });

function* fetchSecretaryWorker() {
  try {
    yield put({ type: actions.SECRETARIES_LOADING_STARTED });
    const secretaries = yield call(ApiService.load, '/secretaries');
    yield put({ type: actions.SECRETARIES_LOADING_SUCCESS, payload: { secretaries } });
  } catch (error) {
    yield put({ type: actions.SECRETARIES_LOADING_FAILED, payload: { error } });
  }
}

function* fetchSecretariesWatcher() {
  yield takeLatest(FETCH_SECRETARIES, fetchSecretaryWorker);
}

export const fetchActiveSecretaries = () => ({ type: actions.FETCH_ACTIVE_SECRETARIES });

function* fetchActiveSecretaryWorker() {
  try {
    yield put({ type: actions.ACTIVE_SECRETARIES_LOADING_STARTED });
    const activeSecretaries = yield call(ApiService.load, '/secretaries/active');
    yield put({
      type: actions.ACTIVE_SECRETARIES_LOADING_SUCCESS,
      payload: { data: activeSecretaries },
    });
  } catch (error) {
    yield put({ type: actions.ACTIVE_SECRETARIES_LOADING_FAILED, payload: { error } });
  }
}

function* fetchActiveSecretariesWatcher() {
  yield takeLatest(FETCH_ACTIVE_SECRETARIES, fetchActiveSecretaryWorker);
}

export const createSecretary = (id) => ({
  type: actions.CREATE_SECRETARY,
  payload: { id },
});

function* createSecretaryWorker({ payload }) {
  try {
    yield put({ type: actions.SECRETARY_CREATING_STARTED });
    const newSecretary = yield call(ApiService.create, `/secretaries/${payload.id}`);
    yield put({ type: actions.SECRETARY_CREATING_SUCCESS, payload: { newSecretary } });
    yield put({ type: actions.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actions.SECRETARY_CREATING_FAILED, payload: { error } });
  }
}

function* createSecretaryWatcher() {
  yield takeEvery(CREATE_SECRETARY, createSecretaryWorker);
}

export const updateSecretary = (id, newData) => ({
  type: actions.UPDATE_SECRETARY,
  payload: { id, newData },
});

function* updateSecretaryWorker({ payload }) {
  try {
    yield put({ type: actions.SECRETARY_UPDATING_STARTED });
    const updatedData = yield call(ApiService.update, `/secretaries/${payload.id}`, payload.newData);
    updatedData.id = payload.id;
    yield put({ type: actions.SECRETARY_UPDATING_SUCCESS, payload: { updatedData } });
    yield put({ type: actions.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actions.SECRETARY_UPDATING_FAILED, payload: { error } });
  }
}

function* updateSecretaryWatcher() {
  yield takeEvery(UPDATE_SECRETARY, updateSecretaryWorker);
}

export const deleteSecretary = (id) => ({
  type: actions.DELETE_SECRETARY,
  payload: { id },
});

function* deleteSecretaryWorker({ payload }) {
  try {
    yield put({ type: actions.SECRETARY_DELETING_STARTED });
    yield call(ApiService.remove, `/secretaries/${payload.id}`);
    yield put({ type: actions.SECRETARY_DELETING_SUCCESS });
    yield put({ type: actions.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actions.SECRETARY_DELETING_FAILED, payload: { error } });
  }
}

function* deleteSecretaryWatcher() {
  yield takeEvery(DELETE_SECRETARY, deleteSecretaryWorker);
}

export function* secretariesWatcher() {
  yield all([
    fork(fetchSecretariesWatcher),
    fork(fetchActiveSecretariesWatcher),
    fork(createSecretaryWatcher),
    fork(updateSecretaryWatcher),
    fork(deleteSecretaryWatcher),
  ]);
}