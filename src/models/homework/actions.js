import {
  put, call, takeLatest, fork, all, takeEvery,
} from 'redux-saga/effects';

import { ApiService } from '@/shared';
import * as actionsTypes from './types.js';

export const fetchHomework = (id) => ({
  type: actionsTypes.FETCH_HOMEWORK_BY_ID,
  payload: { id },
});

export const addHomework = (data) => ({
  type: actionsTypes.ADD_HOMEWORK,
  payload: {
    data,
  },
});

export const editHomework = (data, id) => ({
  type: actionsTypes.EDIT_HOMEWORK,
  payload: {
    data,
    id,
  },
});

function* fetchHomeworkByIdAsync({ payload }) {
  try {
    yield put({ type: actionsTypes.LOADING_HOMEWORK_STARTED_BY_ID });

    const { id } = payload;
    const data = yield call(ApiService.load, `/homework/${id}`);

    yield put({ type: actionsTypes.LOADING_HOMEWORK_FINISHED_BY_ID, payload: { data } });
  } catch (error) {
    yield put({ type: actionsTypes.LOADING_HOMEWORK_FAILED_BY_ID, payload: { error } });
  }
}

function* addHomeworkAsync(homeworkData) {
  try {
    yield put({ type: actionsTypes.ADD_HOMEWORK_STARTED });

    const data = yield call(ApiService.create, '/homework', homeworkData.payload.data);

    yield put({
      type: actionsTypes.ADD_HOMEWORK_FINISHED,
      payload: {
        data,
      },
    });

    yield put({ type: actionsTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionsTypes.ADD_HOMEWORK_FAILED,
      payload: error,
    });
  }
}

function* editHomeworkAsync(editData) {
  try {
    yield put({ type: actionsTypes.EDIT_HOMEWORK_STARTED });

    const data = yield call(ApiService.update, `/homework/${editData.payload.id}`, editData.payload.data);

    yield put({
      type: actionsTypes.EDIT_HOMEWORK_FINISHED,
      payload: {
        data,
      },
    });

    yield put({ type: actionsTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionsTypes.EDIT_HOMEWORK_FAILED,
      payload: {
        error,
      },
    });
    yield put({ type: actionsTypes.CLEAR_LOADED });
  }
}

export function* fetchHomeworkByIdWatcher() {
  yield takeLatest(actionsTypes.FETCH_HOMEWORK_BY_ID, fetchHomeworkByIdAsync);
}

export function* addHomeworkWatcher() {
  yield takeEvery(actionsTypes.ADD_HOMEWORK, addHomeworkAsync);
}

export function* editHomeworkWatcher() {
  yield takeEvery(actionsTypes.EDIT_HOMEWORK, editHomeworkAsync);
}

export function* homeworkWatcher() {
  yield all([
    fork(fetchHomeworkByIdWatcher),
    fork(addHomeworkWatcher),
    fork(editHomeworkWatcher),
  ]);
}