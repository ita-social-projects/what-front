import {
  call, put, takeLatest, all, fork, takeEvery,
} from 'redux-saga/effects';
import { ApiService } from '@shared/api-service/index.js';
import * as actionTypes from './action-types.js';

export const globalLoadStudentGroups = () => ({
  type: actionTypes.LOAD_STUDENT_GROUPS,
});

function* loadStudentGroupsAsync() {
  try {
    yield put({ type: actionTypes.LOADING_STUDENT_GROUPS_STARTED });

    const groups = yield call(ApiService.load, '/student_groups');

    yield put({ type: actionTypes.LOADING_STUDENT_GROUPS_SUCCEED, payload: groups });
  } catch (e) {
    yield put({ type: actionTypes.LOADING_STUDENT_GROUPS_FAILED });
  }
}

function* watchLoadingStudentGroups() {
  yield takeLatest(actionTypes.LOAD_STUDENT_GROUPS, loadStudentGroupsAsync);
}

export const loadStudentGroupById = (id) => ({
  type: actionTypes.LOAD_STUDENT_GROUP_BY_ID,
  payload: id,
});

function* loadStudentGroupByIdAsync({ payload }) {
  try {
    yield put({ type: actionTypes.LOADING_BY_ID_STUDENT_GROUP_STARTED });

    const group = yield call(ApiService.load, `/student_groups/${payload.id}`);

    yield put({ type: actionTypes.LOADING_BY_ID_STUDENT_GROUP_SUCCEED, payload: group });
  } catch (e) {
    yield put({ type: actionTypes.LOADING_BY_ID_STUDENT_GROUP_FAILED });
  }
}

function* watchLoadingStudentGroupById() {
  yield takeLatest(actionTypes.LOAD_STUDENT_GROUP_BY_ID, loadStudentGroupByIdAsync);
}

export const editStudentGroup = (group) => ({
  type: actionTypes.EDIT_STUDENT_GROUP,
  payload: group,
});

function* editStudentGroupsAsync({ payload }) {
  try {
    yield put({ type: actionTypes.EDITING_STUDENT_GROUP_STARTED });

    const group = yield call(ApiService.update, `/student_groups/${payload.id}`, payload);

    yield put({ type: actionTypes.EDITING_STUDENT_GROUP_SUCCEED, payload: group });
  } catch (e) {
    yield put({ type: actionTypes.EDITING_STUDENT_GROUP_FAILED });
  }
}

function* watchEditingStudentGroups() {
  yield takeEvery(actionTypes.EDIT_STUDENT_GROUP, editStudentGroupsAsync);
}

export const addStudentGroup = (group) => ({
  type: actionTypes.EDIT_STUDENT_GROUP,
  payload: group,
});

function* addStudentGroupAsync({ payload }) {
  try {
    yield put({ type: actionTypes.ADDING_STUDENT_GROUP_STARTED });

    const group = yield call(ApiService.create, `/student_groups/${payload.id}`, payload);

    yield put({ type: actionTypes.ADDING_STUDENT_GROUP_SUCCEED, payload: group });
  } catch (e) {
    yield put({ type: actionTypes.ADDING_STUDENT_GROUP_FAILED });
  }
}

function* watchAddingStudentGroup() {
  yield takeEvery(actionTypes.ADD_STUDENT_GROUP, addStudentGroupAsync);
}

export function* studentGroupsWatcher() {
  yield all([
    fork(watchLoadingStudentGroups),
    fork(watchLoadingStudentGroupById),
    fork(watchEditingStudentGroups),
    fork(watchAddingStudentGroup),
  ]);
}