import {
  call, put, takeLatest, all, fork, takeEvery,
} from 'redux-saga/effects';

import { ApiService } from '../../shared/api-service/index.js';
import * as actionTypes from './action-types.js';

export const loadStudents = () => ({
  type: actionTypes.LOAD_STUDENTS,
});

export const loadStudentById = (id) => ({
  type: actionTypes.LOAD_STUDENT_BY_ID,
  payload: { id },
});

export const loadActiveStudents = () => ({
  type: actionTypes.LOAD_ACTIVE_STUDENTS,
});

export const loadStudentGroups = (id) => ({
  type: actionTypes.LOAD_STUDENT_GROUPS,
  payload: { id },
});

export const addStudent = (id) => ({
  type: actionTypes.ADD_STUDENT,
  payload: { id },
});

export const editStudent = (id, data) => ({
  type: actionTypes.EDIT_STUDENT,
  payload: { id, data },
});

export const removeStudent = (id) => ({
  type: actionTypes.REMOVE_STUDENT,
  payload: { id },
});

export const reactivateStudent = (id) => ({
  type: actionTypes.REACTIVATE_STUDENT,
  payload: { id },
});

function* loadStudentsAsync() {
  try {
    yield put({ type: actionTypes.LOADING_STUDENTS_STARTED });

    const data = yield call(ApiService.load, '/students');

    yield put({ type: actionTypes.LOADING_STUDENTS_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.LOADING_STUDENTS_FAILED, payload: { error } });
  }
}

function* loadStudentByIdAsync({ payload }) {
  try {
    yield put({ type: actionTypes.LOADING_BY_ID_STARTED });

    const studentId = payload.id;
    const data = yield call(ApiService.load, `/students/${studentId}`);
    yield put({ type: actionTypes.LOADING_BY_ID_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.LOADING_BY_ID_FAILED, payload: { error } });
  }
}

function* loadActiveStudentsAsync() {
  try {
    yield put({ type: actionTypes.LOADING_ACTIVE_STARTED });

    const data = yield call(ApiService.load, '/students/active');
    yield put({ type: actionTypes.LOADING_ACTIVE_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.LOADING_ACTIVE_SUCCEED, payload: { error } });
  }
}

function* loadStudentGroupsAsync({ payload }) {
  try {
    yield put({ type: actionTypes.LOADING_STUDENT_GROUPS_STARTED });

    const studentId = payload.id;
    const data = yield call(ApiService.load, `/students/${studentId}/groups`);

    yield put({ type: actionTypes.LOADING_STUDENT_GROUPS_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.LOADING_STUDENT_GROUPS_FAILED, payload: { error } });
  }
}

function* addStudentAsync({ payload }) {
  try {
    yield put({ type: actionTypes.ADDING_STUDENT_STARTED });

    const userId = payload.id;
    const data = yield call(ApiService.create, `/students/${userId}`);

    yield put({ type: actionTypes.ADDING_STUDENT_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.ADDING_STUDENT_SUCCEED, payload: { error } });
  }
}

function* editStudentAsync({ payload }) {
  try {
    yield put({ type: actionTypes.EDITING_STUDENT_STARTED });

    const studentId = payload.id;
    const newStudentData = payload.data;
    const data = yield call(ApiService.update, `/students/${studentId}`, newStudentData);

    yield put({ type: actionTypes.EDITING_STUDENT_SUCCEED, payload: { data } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.EDITING_STUDENT_FAILED, payload: { error } });
    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* removeStudentAsync({ payload }) {
  try {
    yield put({ type: actionTypes.REMOVING_STUDENT_STARTED });
    const studentId = payload.id;
    yield call(ApiService.remove, `/students/${studentId}`);
    yield put({ type: actionTypes.REMOVING_STUDENT_SUCCEED, payload: { id: studentId } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.REMOVING_STUDENT_FAILED, payload: { error } });
    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* reactivateStudentAsync({ payload }) {
  try {
    yield put({ type: actionTypes.REACTIVATING_STUDENT_STARTED });
    const studentId = payload.id;
    yield call(ApiService.reactivate, `/students/${studentId}`);
    yield put({ type: actionTypes.REACTIVATING_STUDENT_SUCCEED, payload: { id: studentId } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.REACTIVATING_STUDENT_FAILED, payload: { error } });
    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* watchLoadingStudents() {
  yield takeLatest(actionTypes.LOAD_STUDENTS, loadStudentsAsync);
}

function* watchLoadingStudentById() {
  yield takeLatest(actionTypes.LOAD_STUDENT_BY_ID, loadStudentByIdAsync);
}

function* watchLoadingActiveStudents() {
  yield takeLatest(actionTypes.LOAD_ACTIVE_STUDENTS, loadActiveStudentsAsync);
}

function* watchLoadingStudentGroups() {
  yield takeLatest(actionTypes.LOAD_STUDENT_GROUPS, loadStudentGroupsAsync);
}

function* watchAddingStudent() {
  yield takeEvery(actionTypes.ADD_STUDENT, addStudentAsync);
}

function* watchEditingStudent() {
  yield takeEvery(actionTypes.EDIT_STUDENT, editStudentAsync);
}

function* watchRemovingStudent() {
  yield takeEvery(actionTypes.REMOVE_STUDENT, removeStudentAsync);
}

function* watchReactivatingStudent() {
  yield takeEvery(actionTypes.REACTIVATE_STUDENT, reactivateStudentAsync);
}

export function* studentsWatcher() {
  yield all([
    fork(watchLoadingStudents),
    fork(watchLoadingStudentById),
    fork(watchLoadingActiveStudents),
    fork(watchLoadingStudentGroups),
    fork(watchAddingStudent),
    fork(watchEditingStudent),
    fork(watchRemovingStudent),
    fork(watchReactivatingStudent),
  ]);
}
