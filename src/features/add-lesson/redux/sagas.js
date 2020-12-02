import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from './action-types.js';
import {
  fetchingGroupsStart,
  fetchingGroupsEnd,
  fetchGroupsFailed,
  fetchingStudentsStart,
  fetchingStudentsEnd,
  fetchStudentsFailed,
  fetchingMentorsStart,
  fetchingMentorsEnd,
  fetchMentorsFailed,
} from './actions.js';
import { fetchGroups, fetchMentors, fetchStudents } from './helpers.js';

function* fetchGroupsAsync() {
  try {
    yield put(fetchingGroupsStart());
    const groupsList = yield call(fetchGroups);
    yield put(fetchingGroupsEnd(groupsList));
  } catch (error) {
    yield put(fetchGroupsFailed(error));
  }
}

export function* watchFetchGroups() {
  yield takeEvery(actions.FETCH_GROUPS, fetchGroupsAsync);
}

function* fetchMentorsAsync() {
  try {
    yield put(fetchingMentorsStart());
    const mentorsList = yield call(fetchMentors);
    yield put(fetchingMentorsEnd(mentorsList));
  } catch (error) {
    yield put(fetchMentorsFailed(error));
  }
}

export function* watchFetchMentors() {
  yield takeEvery(actions.FETCH_MENTORS, fetchMentorsAsync);
}

function* fetchStudentsAsync() {
  try {
    yield put(fetchingStudentsStart());
    const studentsList = yield call(fetchStudents);
    yield put(fetchingStudentsEnd(studentsList));
  } catch (error) {
    yield put(fetchStudentsFailed(error));
  }
}

export function* watchFetchStudents() {
  yield takeEvery(actions.FETCH_STUDENTS, fetchStudentsAsync);
}