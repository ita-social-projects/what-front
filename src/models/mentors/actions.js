import {
  call, put, takeLatest, all, fork, takeEvery,
} from 'redux-saga/effects';

import { ApiService } from '../api-service/index.js';
import * as types from './types.js';

export const fetchMentors = () => ({
  type: types.FETCH_MENTORS,
});

export const addMentor = (id) => ({
  type: types.ADD_MENTOR,
  payload: { id },
});

export const editMentor = (id, data) => ({
  type: types.EDIT_MENTOR,
  payload: { id, data },
});

export const deleteMentor = (id) => ({
  type: types.DELETE_MENTOR,
  payload: { id },
});

function* fetchAsyncMentors() {
  try {
    yield put({ type: types.LOADING_SUCCESS });
    const mentors = yield call(ApiService.load, '/mentors');
    yield put({ type: types.FETCHING_MENTORS_SUCCESS, payload: { mentors } });
  } catch (error) {
    yield put({ type: types.LOADING_FAILED, payload: { error } });
  }
}

function* addAsyncMentor({ payload }) {
  try {
    yield put({ type: types.LOADING_SUCCESS });
    const uuid = payload.id;
    const mentor = yield call(ApiService.create, `/mentors/${uuid}`);
    yield put({ type: types.ADDING_MENTOR_SUCCESS, payload: { mentor } });
  } catch (error) {
    yield put({ type: types.LOADING_FAILED, payload: { error } });
  }
}

function* editAsyncMentor({ payload }) {
  try {
    yield put({ type: types.LOADING_SUCCESS });
    const mentorId = payload.id;
    const newMentor = payload.data;
    const mentor = yield call(ApiService.update, `/mentors/${mentorId}`, newMentor);
    yield put({ type: types.EDITING_MENTOR_SUCCESS, payload: { mentor } });
  } catch (error) {
    yield put({ type: types.LOADING_FAILED, payload: { error } });
  }
}

function* deleteAsyncMentor({ payload }) {
  try {
    yield put({ type: types.LOADING_SUCCESS });
    const mentorId = payload.id;
    yield call(ApiService.remove, `/mentors/${mentorId}`);
    yield put({ type: types.DELETING_MENTOR_SUCCESS, payload: { id: mentorId } });
  } catch (error) {
    yield put({ type: types.LOADING_FAILED, payload: { error } });
  }
}

function* watchFetchingMentors() {
  yield takeLatest(types.FETCH_MENTORS, fetchAsyncMentors);
}

function* watchAddingMentor() {
  yield takeEvery(types.ADD_MENTOR, addAsyncMentor);
}

function* watchEditingMentor() {
  yield takeEvery(types.EDIT_MENTOR, editAsyncMentor);
}

function* watchDeletingMentor() {
  yield takeEvery(types.DELETE_MENTOR, deleteAsyncMentor);
}

export function* mentorsSaga() {
  yield all([
    fork(watchFetchingMentors),
    fork(watchAddingMentor),
    fork(watchEditingMentor),
    fork(watchDeletingMentor),
  ]);
}