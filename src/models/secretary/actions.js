import {
  all, fork, call, put, takeLatest, takeEvery,
} from 'redux-saga/effects';
import { ApiService } from '../../shared/api-service/api-service.js';
import * as actions from './action-types.js';
import {
  CREATE_SECRETARY, DELETE_SECRETARY, FETCH_SECRETARIES, UPDATE_SECRETARY,
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

export const createSecretary = (id) => ({
  type: actions.CREATE_SECRETARY,
  payload: { id },
});

function* createSecretaryWorker({ payload }) {
  try {
    yield put({ type: actions.SECRETARY_CREATING_STARTED });
    const newSecretary = yield call(ApiService.create, `/secretaries/${payload.id}`);
    yield put({ type: actions.SECRETARY_CREATING_SUCCESS, payload: { newSecretary } });
  } catch (error) {
    yield put({ type: actions.SECRETARY_CREATING_FAILED, payload: { error } });
  }
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
  } catch (error) {
    yield put({ type: actions.SECRETARY_UPDATING_FAILED, payload: { error } });
  }
}

export const deleteSecretary = (id) => ({
  type: actions.DELETE_SECRETARY,
  payload: { id },
});

function* deleteSecretaryWorker({ payload }) {
  try {
    yield put({ type: actions.SECRETARY_DELETING_STARTED });
    yield call(ApiService.remove, `/secretaries/${payload.id}`);
    const secretaryId = payload.id;
    yield put({ type: actions.SECRETARY_DELETING_SUCCESS, payload: { secretaryId } });
  } catch (error) {
    yield put({ type: actions.SECRETARY_UPDATING_FAILED, payload: { error } });
  }
}

function* fetchSecretariesWatcher() {
  yield takeLatest(FETCH_SECRETARIES, fetchSecretaryWorker);
}

function* createSecretaryWatcher() {
  yield takeEvery(CREATE_SECRETARY, createSecretaryWorker);
}

function* updateSecretaryWatcher() {
  yield takeEvery(UPDATE_SECRETARY, updateSecretaryWorker);
}

function* deleteSecretaryWatcher() {
  yield takeEvery(DELETE_SECRETARY, deleteSecretaryWorker);
}

export function* secretariesWatcher() {
  yield all([
    fork(createSecretaryWatcher),
    fork(fetchSecretariesWatcher),
    fork(updateSecretaryWatcher),
    fork(deleteSecretaryWatcher),
  ]);
}