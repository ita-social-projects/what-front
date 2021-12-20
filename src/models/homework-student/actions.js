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

export const addHomeworkStudent = (homeworkStudent) => ({
  type: actionTypes.ADD_HOMEWORK_STUDENT,
  payload: {
    homeworkStudent,
  },
});

export const getHomeworkStudent = () => ({
  type: actionTypes.GET_HOMEWORK_STUDENT,
  payload: {
  },
});

export const getHomeworkByIdStudent = (id) => ({
  type: actionTypes.GET_HOMEWORK_STUDENT_BY_ID,
  payload: {
    id,
  },
});

export const updateHomeworkStudent = (id, homeworkStudent) => ({
  type: actionTypes.UPDATE_HOMEWORK_STUDENT,
  payload: {
    id,
    homeworkStudent
  },
});

function* addHomeworkStudentWorker(data) {
  try {
    yield put({ type: actionTypes.ADDING_HOMEWORK_STUDENT_STARTED });
    const homeworkStudent = yield call(
      ApiService.create,
      '/homeworkstudent',
      data.payload.homeworkStudent
    );

    yield put({
      type: actionTypes.ADDING_HOMEWORK_STUDENT_SUCCESS,
      payload: { homeworkStudent },
    });

    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.ADDING_HOMEWORK_STUDENT_FAILED,
      payload: { error },
    });

    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* getHomeworkStudentWorker() {
  try {
    yield put({ type: actionTypes.LOADING_HOMEWORK_STUDENT_STARTED });

    const homeworkStudent = yield call(
      ApiService.load,
      `/homeworkstudent`
    );

    yield put({
      type: actionTypes.LOADING_HOMEWORK_STUDENT_SUCCESS,
      payload: { homeworkStudent },
    });
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_HOMEWORK_STUDENT_FAILED,
      payload: { error },
    });
  }
}

function* getHomeworkStudentByIdWorker(data) {
  try {
    yield put({ type: actionTypes.LOADING_HOMEWORK_STUDENT_BY_ID_STARTED });

    const homeworkStudent = yield call(
      ApiService.load,
      `/homeworkstudent/${data.payload.id}`
    );

    yield put({
      type: actionTypes.LOADING_HOMEWORK_STUDENT_BY_ID_SUCCESS,
      payload: { homeworkStudent },
    });
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_HOMEWORK_STUDENT_BY_ID_FAILED,
      payload: { error },
    });
  }
}

function* updateHomeworkStudentWorker(data) {
  try {
    yield put({ type: actionTypes.UPDATING_HOMEWORK_STUDENT_STARTED });

    const homeworkStudent = yield call(
      ApiService.update,
      `/homeworkstudent/${data.payload.id}`,
      data.payload.homeworkStudent
    );

    yield put({
      type: actionTypes.UPDATING_HOMEWORK_STUDENT_SUCCESS,
      payload: { homeworkStudent },
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATING_HOMEWORK_STUDENT_FAILED,
      payload: { error },
    });
  }
}

function* getHomeworkStudentWatcher() {
  yield takeLatest(actionTypes.GET_HOMEWORK_STUDENT, getHomeworkStudentWorker);
}

function* getHomeworkStudentByIdWatcher() {
  yield takeLatest(actionTypes.GET_HOMEWORK_STUDENT_BY_ID, getHomeworkStudentByIdWorker);
}

function* addHomeworkStudentWatcher() {
  yield takeEvery(actionTypes.ADD_HOMEWORK_STUDENT, addHomeworkStudentWorker);
}

function* updateHomeworkStudentWatcher() {
  yield takeEvery(actionTypes.UPDATE_HOMEWORK_STUDENT, updateHomeworkStudentWorker);
}

export function* homeworkStudentWatcher() {
  yield all([
    fork(getHomeworkStudentWatcher),
    fork(getHomeworkStudentByIdWatcher),
    fork(addHomeworkStudentWatcher),
    fork(updateHomeworkStudentWatcher),
  ]);
}
