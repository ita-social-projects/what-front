import { all, fork, put, call, takeEvery } from 'redux-saga/effects';
import { ApiService } from '../../shared/api-service';
import * as actionTypes from './types';

export const exportStudentsClassbook = (studentsClassbookData) => ({
  type: actionTypes.CREATE_STUDENTS_CLASSBOOK,
  payload: {
    studentsClassbookData,
  },
});

export const exportStudentClassbook = (studentClassbook, id) => ({
  type: actionTypes.CREATE_STUDENT_CLASSBOOK,
  payload: {
    studentClassbook,
    id,
  },
});

export const exportStudentsResults = (studentsResults) => ({
  type: actionTypes.CREATE_STUDENTS_RESULTS,
  payload: {
    studentsResults,
  },
});

export const exportStudentResults = (studentResults, id) => ({
  type: actionTypes.CREATE_STUDENT_RESULTS,
  payload: {
    studentResults,
    id,
  },
});

export const exportStudentGroupResults = (studentGroupResults, id) => ({
  type: actionTypes.CREATE_STUDENT_GROUP_RESULTS,
  payload: {
    studentGroupResults,
    id,
  },
});

function* exportStudentsClassbookWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENTS_CLASSBOOK_STARTED });
    const studentsClassbook = yield call(ApiService.create, '/exports/studentsClassbook', data.payload.studentsClassbookData);
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

function* exportStudentsResultsWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENTS_RESULTS_STARTED });
    const studentsResults = yield call(ApiService.create, '/exports/studentsResults', data.payload.studentsResults);
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

function* exportStudentClassbookWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENT_CLASSBOOK_STARTED });
    yield call(ApiService.create, `/exports/studentClassbook/${data.payload.id}`, data.payload.studentsResults);
    yield put({ type: actionTypes.CREATING_STUDENT_CLASSBOOK_FINISHED });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.CREATING_STUDENT_CLASSBOOK_FAILED,
      payload: { error },
    });
  }
}

function* exportStudentResultsWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENT_RESULTS_STARTED });
    yield call(ApiService.create, `/exports/studentResults/${data.payload.id}`, data.payload.studentResults);
    yield put({ type: actionTypes.CREATING_STUDENT_RESULTS_FINISHED });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.CREATING_STUDENT_RESULTS_FAILED,
      payload: { error },
    });
  }
}

function* exportStudentGroupResultsWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_STUDENT_GROUP_RESULTS_STARTED });
    yield call(ApiService.create, `/exports/studentGroupResults/${data.payload.id}`, data.payload.studentGroupResults);
    yield put({ type: actionTypes.CREATING_STUDENT_GROUP_RESULTS_FINISHED });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionTypes.CREATING_STUDENT_GROUP_RESULTS_FAILED,
      payload: { error },
    });
  }
}

function* exportStudentsClassbookWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENTS_CLASSBOOK, exportStudentsClassbookWorker);
}

function* exportStudentClassbookWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENT_CLASSBOOK, exportStudentClassbookWorker);
}

function* exportStudentsResultsWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENTS_RESULTS, exportStudentsResultsWorker);
}

function* exportStudentResultsWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENT_RESULTS, exportStudentResultsWorker);
}

function* exportStudentGroupResultsWatcher() {
  yield takeEvery(actionTypes.CREATE_STUDENT_GROUP_RESULTS, exportStudentGroupResultsWorker);
}

export function* exportWatcher() {
  yield all([
    fork(exportStudentsClassbookWatcher),
    fork(exportStudentClassbookWatcher),
    fork(exportStudentsResultsWatcher),
    fork(exportStudentResultsWatcher),
    fork(exportStudentGroupResultsWatcher),
  ]);
}
