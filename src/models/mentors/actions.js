import {
  call, put, takeLatest, all, fork, takeEvery,
} from 'redux-saga/effects';

import * as types from '@models/mentors/types';
import { ApiService } from '../../shared/api-service/index.js';

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

export const editMentor = (id, data) => ({
  type: types.EDIT_MENTOR,
  payload: { id, data },
});

export const deleteMentor = (id) => ({
  type: types.DELETE_MENTOR,
  payload: { id },
});

function* fetchAsyncMentors() {
  try {
    yield put({ type: types.FETCHING_MENTORS_STARTED });
    const data = yield call(ApiService.load, '/mentors');
    yield put({ type: types.FETCHING_MENTORS_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: types.FETCHING_MENTORS_FAILED, payload: { error } });
  }
}

function* fetchAsyncMentorById({ payload }) {
  try {
    yield put({ type: types.FETCHING_BY_ID_STARTED });
    const mentorId = payload.id;
    const data = yield call(ApiService.load, `/mentors/${mentorId}`);
    // TODO Remove extra 'data' field when backend fix response
    yield put({ type: types.FETCHING_BY_ID_SUCCEED, payload: { data: data.data } });
  } catch (error) {
    yield put({ type: types.FETCHING_BY_ID_FAILED, payload: { error } });
  }
}

function* fetchAsyncActiveMentors() {
  try {
    yield put({ type: types.FETCHING_ACTIVE_STARTED });
    const data = yield call(ApiService.load, '/mentors/active');
    yield put({ type: types.FETCHING_ACTIVE_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: types.FETCHING_ACTIVE_SUCCEED, payload: { error } });
  }
}

function* fetchAsyncMentorsGroups({ payload }) {
  try {
    yield put({ type: types.FETCHING_MENTOR_GROUPS_STARTED });
    const mentorId = payload.id;
    const data = yield call(ApiService.load, `/mentors/${mentorId}/groups`);
    yield put({ type: types.FETCHING_MENTOR_GROUPS_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: types.FETCHING_MENTOR_GROUPS_FAILED, payload: { error } });
  }
}

function* fetchAsyncMentorsCourses({ payload }) {
  try {
    yield put({ type: types.FETCHING_MENTOR_COURSES_STARTED });
    const mentorId = payload.id;
    const data = yield call(ApiService.load, `/mentors/${mentorId}/courses`);
    yield put({ type: types.FETCHING_MENTOR_COURSES_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: types.FETCHING_MENTOR_COURSES_FAILED, payload: { error } });
  }
}

function* addAsyncMentor({ payload }) {
  try {
    yield put({ type: types.ADDING_MENTOR_STARTED });
    const mentorId = payload.id;
    const data = yield call(ApiService.create, `/mentors/${mentorId}`);
    yield put({ type: types.ADDING_MENTOR_SUCCEED, payload: { data } });
    yield put({ type: types.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: types.ADDING_MENTOR_FAILED, payload: { error } });
  }
}

function* editAsyncMentor({ payload }) {
  try {
    yield put({ type: types.EDITING_MENTOR_STARTED });
    const mentorId = payload.id;
    const newMentor = payload.data;
    const data = yield call(ApiService.update, `/mentors/${mentorId}`, newMentor);
    yield put({ type: types.EDITING_MENTOR_SUCCEED, payload: { data } });
    yield put({ type: types.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: types.EDITING_MENTOR_FAILED, payload: { error } });
  }
}

function* deleteAsyncMentor({ payload }) {
  try {
    yield put({ type: types.DELETING_MENTOR_STARTED });
    const mentorId = payload.id;
    yield call(ApiService.remove, `/mentors/${mentorId}`);
    yield put({ type: types.DELETING_MENTOR_SUCCEED, payload: { id: mentorId } });
    yield put({ type: types.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: types.DELETING_MENTOR_FAILED, payload: { error } });
  }
}

function* fetchingMentorsWatcher() {
  yield takeLatest(types.FETCH_MENTORS, fetchAsyncMentors);
}

function* fetchingMentorsByIdWatcher() {
  yield takeLatest(types.FETCH_MENTOR_BY_ID, fetchAsyncMentorById);
}

function* fetchingActiveMentorsWatcher() {
  yield takeLatest(types.FETCH_ACTIVE_MENTORS, fetchAsyncActiveMentors);
}

function* fetchingMentorsGroupsWatcher() {
  yield takeLatest(types.FETCH_MENTOR_GROUPS, fetchAsyncMentorsGroups);
}

function* fetchingMentorsCoursesWatcher() {
  yield takeLatest(types.FETCH_MENTOR_GROUPS, fetchAsyncMentorsCourses);
}

function* addingMentorWatcher() {
  yield takeEvery(types.ADD_MENTOR, addAsyncMentor);
}

function* editingMentorWatcher() {
  yield takeEvery(types.EDIT_MENTOR, editAsyncMentor);
}

function* deletingMentorWatcher() {
  yield takeEvery(types.DELETE_MENTOR, deleteAsyncMentor);
}

export function* mentorsWatcher() {
  yield all([
    fork(fetchingMentorsWatcher),
    fork(fetchingMentorsByIdWatcher),
    fork(fetchingActiveMentorsWatcher),
    fork(fetchingMentorsGroupsWatcher),
    fork(fetchingMentorsCoursesWatcher),
    fork(addingMentorWatcher),
    fork(editingMentorWatcher),
    fork(deletingMentorWatcher),
  ]);
}
