import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { ApiService } from '@/shared';
import * as actionTypes from './types.js';

export const sendGroups = (id, groups) => ({
  type: actionTypes.SEND_GROUPS,
  payload: { 
    id,
    groups 
  },
});

export const sendStudents = (id, students) => ({
  type: actionTypes.SEND_STUDENTS,
  payload: {
    id,
    students
  },
});

export const sendThemes = (themes) => ({
  type: actionTypes.SEND_THEMES,
  payload: { themes },
});

export function* sendGroupsWatcher() {
  yield takeEvery(actionTypes.SEND_GROUPS, sendGroupsWorker);
}

export function* sendStudentsWatcher() {
  yield takeEvery(actionTypes.SEND_STUDENTS, sendStudentsWorker);
}

export function* sendThemesWatcher() {
  yield takeEvery(actionTypes.SEND_THEMES, sendThemesWorker);
}

function* sendGroupsWorker(data) {
  try {
    yield put({ type: actionTypes.SENDING_GROUPS_STARTED });
    const courseId = data.payload.id;
    const groupsFile = data.payload.groups;
    const groups = yield call(ApiService.create, `/imports/groups/${courseId}`, groupsFile);
    yield put({ type: actionTypes.SENDING_GROUPS_SUCCESS, payload: { groups } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.SENDING_GROUPS_FAILED, payload: { error } });
  }
}

function* sendStudentsWorker(data) {
  try {
    yield put({ type: actionTypes.SENDING_STUDENTS_STARTED });
    const students = yield call(ApiService.create, `/imports/students/${data.payload.id}`, data.payload.students);
    yield put({ type: actionTypes.SENDING_STUDENTS_SUCCESS, payload: { students } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.SENDING_STUDENTS_FAILED, payload: { error } });
  }
}

function* sendThemesWorker(data) {
  try {
    yield put({ type: actionTypes.SENDING_THEMES_STARTED });
    const themes = yield call(ApiService.create, '/imports/themes', data.payload.themes);
    yield put({ type: actionTypes.SENDING_THEMES_SUCCESS, payload: { themes } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.SENDING_THEMES_FAILED, payload: { error } });
  }
}

export function* importWatcher() {
  yield all([
    fork(sendGroupsWatcher),
    fork(sendStudentsWatcher),
    fork(sendThemesWatcher),
  ]);
}
