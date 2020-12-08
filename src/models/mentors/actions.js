import {
  call, put, takeLatest, all, fork, takeEvery,
} from 'redux-saga/effects';

import { ApiService } from '../../shared/api-service/index.js';
import * as types from '@models/mentors/types';


export const fetchMentors = () => ({
  type: types.FETCH_MENTORS,
});

export const fetchMentorById = (id) => ({
  type: types.FETCH_MENTOR_BY_ID,
  payload: { id },
});

export const fetchActiveMentors = () => ({
  type: types.FETCH_ACTIVE_MENTORS,
});

export const fetchMentorGroups = (id) => ({
  type: types.FETCH_MENTOR_GROUPS,
  payload: { id },
});

export const fetchMentorCourses = (id) => ({
  type: types.FETCH_MENTOR_COURSES,
  payload: { id },
});

export const addMentor = (id) => ({
  type: types.ADD_MENTOR,
  payload: { id },
});

export const editMentor = (id, mentor) => ({
  type: types.EDIT_MENTOR,
  payload: { id, mentor },
});

export const deleteMentor = (id) => ({
  type: types.DELETE_MENTOR,
  payload: { id },
});

function* fetchAsyncMentors() {
  try {
    yield put({ type: types.FETCHING_MENTORS_STARTED });
    const mentors = yield call(ApiService.load, '/mentors');
    yield put({ type: types.FETCHING_MENTORS_SUCCEED, payload: { mentors } });
  } catch (error) {
    yield put({ type: types.FETCHING_MENTORS_FAILED, payload: { error } });
  }
}

function* fetchAsyncMentorById({ payload }) {
  try {
    yield put({ type: types.FETCHING_BY_ID_STARTED });
    const id = payload.id;
    const mentor = yield call(ApiService.load, `/mentors/${id}`);
    yield put({ type: types.FETCHING_BY_ID_SUCCEED, payload: { mentor } });
  } catch (error) {
    yield put({ type: types.FETCHING_BY_ID_FAILED, payload: { error } });
  }
}

function* fetchAsyncActiveMentors() {
  try {
    yield put({ type: types.FETCHING_ACTIVE_STARTED });
    const mentorsActive = yield call(ApiService.load, '/mentors/active');
    yield put({ type: types.FETCHING_ACTIVE_SUCCEED, payload: { mentorsActive } });
  } catch (error) {
    yield put({ type: types.FETCHING_ACTIVE_SUCCEED, payload: { error } });
  }
}

function* fetchAsyncMentorsGroups({ payload }) {
  try {
    yield put({ type: types.FETCHING_MENTOR_GROUPS_STARTED });
    const id = payload.id;
    const mentorGroups = yield call(ApiService.load, `/mentors/${id}/groups`);
    yield put({ type: types.FETCHING_MENTOR_GROUPS_SUCCEED, payload: { mentorGroups } });
  } catch (error) {
    yield put({ type: types.FETCHING_MENTOR_GROUPS_FAILED, payload: { error } });
  }
}

function* fetchAsyncMentorsCourses({ payload }) {
  try {
    yield put({ type: types.FETCHING_MENTOR_COURSES_STARTED });
    const id = payload.id;
    const mentorCourses = yield call(ApiService.load, `/mentors/${id}/courses`);
    yield put({ type: types.FETCHING_MENTOR_COURSES_SUCCEED, payload: { mentorCourses } });
  } catch (error) {
    yield put({ type: types.FETCHING_MENTOR_COURSES_FAILED, payload: { error } });
  }
}

function* addAsyncMentor({ payload }) {
  try {
    yield put({ type: types.ADDING_MENTOR_STARTED });
    const id = payload.id;
    const mentor = yield call(ApiService.create, `/mentors/${id}`);
    yield put({ type: types.ADDING_MENTOR_SUCCEED, payload: { mentor } });
  } catch (error) {
    yield put({ type: types.ADDING_MENTOR_FAILED, payload: { error } });
  }
}

function* editAsyncMentor({ payload }) {
  try {
    yield put({ type: types.EDITING_MENTOR_STARTED });
    const id = payload.id;
    const newMentor = payload.data;
    const mentor = yield call(ApiService.update, `/mentors/${id}`, newMentor);
    yield put({ type: types.EDITING_MENTOR_SUCCEED, payload: { mentor } });
  } catch (error) {
    yield put({ type: types.EDITING_MENTOR_FAILED, payload: { error } });
  }
}

function* deleteAsyncMentor({ payload }) {
  try {
    yield put({ type: types.DELETING_MENTOR_STARTED });
    const id = payload.id;
    yield call(ApiService.remove, `/mentors/${id}`);
    yield put({ type: types.DELETING_MENTOR_SUCCEED, payload: { id: id } });
  } catch (error) {
    yield put({ type: types.DELETING_MENTOR_FAILED, payload: { error } });
  }
}

function* watchFetchingMentors() {
  yield takeLatest(types.FETCH_MENTORS, fetchAsyncMentors);
}

function* watchFetchingMentorsById() {
  yield takeLatest(types.FETCH_MENTOR_BY_ID, fetchAsyncMentorById);
}

function* watchFetchingActiveMentors() {
  yield takeLatest(types.FETCH_ACTIVE_MENTORS, fetchAsyncActiveMentors);
}

function* watchFetchingMentorsGroups() {
  yield takeLatest(types.FETCH_MENTOR_GROUPS, fetchAsyncMentorsGroups);
}

function* watchFetchingMentorsCourses() {
  yield takeLatest(types.FETCH_MENTOR_GROUPS, fetchAsyncMentorsCourses);
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
    fork(watchFetchingActiveMentors),
    fork(watchFetchingMentorsById),
    fork(watchFetchingMentorsGroups),
    fork(watchFetchingMentorsCourses),
    fork(watchAddingMentor),
    fork(watchEditingMentor),
    fork(watchDeletingMentor),
  ]);
}
