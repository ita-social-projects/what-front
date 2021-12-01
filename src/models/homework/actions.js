import {
  all,
  fork,
  put,
  call,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import { ApiService } from '../../shared/api-service';
import * as actionTypes from './types';

export const addHomework = (homework) => ({
  type: actionTypes.ADD_HOMEWORK,
  payload: {
    homework,
  },
});

export const getHomework = (id) => ({
  type: actionTypes.GET_HOMEWORK,
  payload: {
    id,
  },
});

export const updateHomework = (id) => ({
  type: actionTypes.UPDATE_HOMEWORK,
  payload: {
    id,
  },
});

function* addHomeworkWorker(data) {
  try {
    yield put({ type: actionTypes.ADDING_HOMEWORK_STARTED });
    const homework = yield call(
      ApiService.create,
      '/homeworks',
      data.payload.homework
    );

    yield put({
      type: actionTypes.ADDING_HOMEWORK_SUCCESS,
      payload: { homework },
    });

    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.ADDING_HOMEWORK_FAILED,
      payload: { error },
    });

    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* getHomeworkWorker(data) {
  try {
    yield put({ type: actionTypes.LOADING_HOMEWORK_STARTED });

    const homework = yield call(
      ApiService.load,
      `/homeworks/${data.payload.id}`
    );

    yield put({
      type: actionTypes.LOADING_HOMEWORK_SUCCESS,
      payload: { homework },
    });
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_HOMEWORK_FAILED,
      payload: { error },
    });
  }
}

function* updateHomeworkWorker(data) {
  try {
    yield put({ type: actionTypes.UPDATING_HOMEWORK_STARTED });

    const homework = yield call(
      ApiService.update,
      `/homeworks/${data.payload.id}`
    );

    yield put({
      type: actionTypes.UPDATING_HOMEWORK_SUCCESS,
      payload: { homework },
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATING_HOMEWORK_FAILED,
      payload: { error },
    });
  }
}

function* getHomeworkWatcher() {
  yield takeLatest(actionTypes.GET_HOMEWORK, getHomeworkWorker);
}

function* addHomeworkWatcher() {
  yield takeEvery(actionTypes.ADD_HOMEWORK, addHomeworkWorker);
}

function* updateHomeworkWatcher() {
  yield takeEvery(actionTypes.UPDATE_HOMEWORK, updateHomeworkWorker);
}

export function* homeworkWatcher() {
  yield all([
    fork(getHomeworkWatcher),
    fork(addHomeworkWatcher),
    fork(updateHomeworkWatcher),
  ]);
}
