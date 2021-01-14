import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { ApiService } from '../../shared/api-service';
import * as actionTypes from './types';

export const createStudentsClassbook = (studentsClassbookData) => ({
  type: actionTypes.CREATE_STUDENTS_CLASSBOOK,
  payload: {
    studentsClassbookData,
  },
});

export const createStudentClassbook = (studentClassbook, id) => ({
  type: actionTypes.CREATE_STUDENT_CLASSBOOK,
  payload: {
    studentClassbook,
    id,
  },
});

export const createStudentsResults = (studentsResults) => ({
  type: actionTypes.CREATE_STUDENTS_RESULTS,
  payload: {
    studentsResults,
  },
});

export const createStudentResults = (studentResults, id) => ({
  type: actionTypes.CREATE_STUDENT_RESULTS,
  payload: {
    studentResults,
    id,
  },
});

export const createStudentGroupResults = (studentGroupResults, id) => ({
  type: actionTypes.CREATE_STUDENT_GROUP_RESULTS,
  payload: {
    studentGroupResults,
    id,
  },
});

function* createStudentsClassbookWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENTS_CLASSBOOK_STARTED });
    const studentsClassbook = yield call(ApiService.create, '/dashboard/studentsClassbook', data.payload.studentsClassbookData);
    yield put({
      type: actionTypes.CREATING_STUDENTS_CLASSBOOK_FINISHED,
      payload: { studentsClassbook },
    });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.CREATING_STUDENTS_CLASSBOOK_FAILED,
      payload: { error },
    });
  }
}

function* createStudentsResultsWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENTS_RESULTS_STARTED });
    const studentsResults = yield call(ApiService.create, '/dashboard/studentsResults', data.payload.studentsResults);
    yield put({
      type: actionTypes.CREATING_STUDENTS_RESULTS_FINISHED,
      payload: { studentsResults },
    });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.CREATING_STUDENTS_RESULTS_FAILED,
      payload: { error },
    });
  }
}

function* createStudentClassbookWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENT_CLASSBOOK_STARTED });
    yield call(ApiService.create, `/dashboard/studentClassbook/${data.payload.id}`, data.payload.studentsResults);
    yield put({
      type: actionTypes.CREATING_STUDENT_CLASSBOOK_FINISHED,
    });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.CREATING_STUDENT_CLASSBOOK_FAILED,
      payload: { error },
    });
  }
}

function* createStudentResultsWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENT_RESULTS_STARTED });
    yield call(ApiService.create, `/dashboard/studentResults/${data.payload.id}`, data.payload.studentResults);
    yield put({
      type: actionTypes.CREATING_STUDENT_RESULTS_FINISHED,
    });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.CREATING_STUDENT_RESULTS_FAILED,
      payload: { error },
    });
  }
}

function* createStudentGroupResultsWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENT_GROUP_RESULTS_STARTED });
    yield call(ApiService.create, `/dashboard/studentGroupResults/${data.payload.id}`, data.payload.studentGroupResults);
    yield put({
      type: actionTypes.CREATING_STUDENT_GROUP_RESULTS_FINISHED,
    });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.CREATING_STUDENT_GROUP_RESULTS_FAILED,
      payload: { error },
    });
  }
}

function* createStudentsClassbookWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENTS_CLASSBOOK, createStudentsClassbookWorker);
}

function* createStudentClassbookWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENT_CLASSBOOK, createStudentClassbookWorker);
}

function* createStudentsResultsWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENTS_RESULTS, createStudentsResultsWorker);
}

function* createStudentResultsWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENT_RESULTS, createStudentResultsWorker);
}

function* createStudentGroupResultsWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENT_GROUP_RESULTS, createStudentGroupResultsWorker);
}

export function* dashboardWatcher() {
  yield all([
    fork(createStudentsClassbookWatcher),
    fork(createStudentClassbookWatcher),
    fork(createStudentsResultsWatcher),
    fork(createStudentResultsWatcher),
    fork(createStudentGroupResultsWatcher),
  ]);
}
