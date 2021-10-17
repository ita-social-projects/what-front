import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { ApiService } from '../../shared/api-service';
import * as actionTypes from './types';

export const fetchActiveCourses = () => ({
  type: actionTypes.FETCH_ACTIVE_COURSES,
});

export const fetchNotActiveCourses = () => ({
  type: actionTypes.FETCH_NOT_ACTIVE_COURSES,
});

export const createCourse = (course) => ({
  type: actionTypes.CREATE_COURSE,
  payload: {
    course,
  },
});

export const editCourse = (course, id) => ({
  type: actionTypes.EDIT_COURSE,
  payload: {
    course,
    id,
  },
});

export const deleteCourse = (id) => ({
  type: actionTypes.DELETE_COURSE,
  payload: {
    id,
  },
});


export const reactivateCourse = (id) => ({
  type: actionTypes.REACTIVATE_COURSE,
  payload: {
    id,
  },
});

function* loadActiveCoursesWorker() {
  try {
    yield put({ type: actionTypes.LOADING_ACTIVE_COURSES_STARTED });
    const courses = yield call(ApiService.load, '/courses?isActive=true');
    yield put({ type: actionTypes.LOADING_ACTIVE_COURSES_SUCCESS, payload: { courses } });
  } catch (error) {
    yield put({ type: actionTypes.LOADING_ACTIVE_COURSES_FAILED, payload: { error } });
  }
}

function* loadNotActiveCoursesWorker() {
  try {
    yield put({ type: actionTypes.LOADING_NOT_ACTIVE_COURSES_STARTED });
    const courses = yield call(ApiService.load, '/courses?isActive=false');
    yield put({ type: actionTypes.LOADING_NOT_ACTIVE_COURSES_SUCCESS, payload: { courses } });
  } catch (error) {
    yield put({ type: actionTypes.LOADING_NOT_ACTIVE_COURSES_FAILED, payload: { error } });
  }
}

function* createCourseWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_COURSE_STARTED });
    const course = yield call(ApiService.create, '/courses', data.payload.course);
    yield put({ type: actionTypes.CREATING_COURSE_SUCCESS, payload: { course } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.CREATING_COURSE_FAILED, payload: { error } });
    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* editCourseWorker(data) {
  try {
    yield put({ type: actionTypes.EDITING_COURSE_STARTED });
    const course = yield call(ApiService.update, `/courses/${data.payload.id}`, data.payload.course);
    yield put({ type: actionTypes.EDITING_COURSE_SUCCESS, payload: { course } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.EDITING_COURSE_FAILED, payload: { error } });
    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* deleteCourseWorker(data) {
  try {
    yield put({ type: actionTypes.DELETING_COURSE_STARTED });
    yield call(ApiService.remove, `/courses/${data.payload.id}`);
    yield put({ type: actionTypes.DELETING_COURSE_SUCCESS });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.DELETING_COURSE_FAILED, payload: { error } });
    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* reactivateCourseWorker(data) {
  try {
    yield put({ type: actionTypes.REACTIVATING_COURSE_STARTED });
    yield call(ApiService.patch, `/courses/${data.payload.id}`);
    yield put({ type: actionTypes.REACTIVATING_COURSE_SUCCESS });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.REACTIVATING_COURSE_FAILED, payload: { error } });
    yield put({ type: actionTypes.CLEAR_ERROR });
  }
}

function* fetchActiveCoursesWatcher() {
  yield takeLatest(actionTypes.FETCH_ACTIVE_COURSES, loadActiveCoursesWorker);
}

function* fetchNotActiveCoursesWatcher() {
  yield takeLatest(actionTypes.FETCH_NOT_ACTIVE_COURSES, loadNotActiveCoursesWorker);
}

function* createCourseWatcher() {
  yield takeEvery(actionTypes.CREATE_COURSE, createCourseWorker);
}

function* editCourseWatcher() {
  yield takeEvery(actionTypes.EDIT_COURSE, editCourseWorker);
}

function* deleteCourseWatcher() {
  yield takeEvery(actionTypes.DELETE_COURSE, deleteCourseWorker);
}

function* reactivateCourseWatcher() {
  yield takeEvery(actionTypes.REACTIVATE_COURSE, reactivateCourseWorker);
}

export function* coursesWatcher() {
  yield all([
    fork(fetchActiveCoursesWatcher),
    fork(fetchNotActiveCoursesWatcher),
    fork(createCourseWatcher),
    fork(editCourseWatcher),
    fork(deleteCourseWatcher),
    fork(reactivateCourseWatcher),
  ]);
}
