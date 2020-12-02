import { all, fork, put, call, takeLatest } from 'redux-saga/effects';
import { ApiService } from '../api-service';
import * as actionTypes from './types';

export const getCourses = () => {
  return {
    type: actionTypes.FETCH_COURSES,
  };
};

export const createCourse = (course) => {
  return {
    type: actionTypes.CREATE_COURSE,
    payload: {
      course,
    },
  };
};

export const editCourse = (course, id) => {
  return {
    type: actionTypes.EDIT_COURSE,
    payload: {
      course,
      id,
    },
  };
};

export function* loadCoursesWatcher() {
  yield takeLatest(actionTypes.FETCH_COURSES, loadCoursesWorker);
}

export function* createCourseWatcher() {
  yield takeLatest(actionTypes.CREATE_COURSE, createCourseWorker);
}

export function* editCourseWatcher() {
  yield takeLatest(actionTypes.EDIT_COURSE, editCourseWorker);
}

function* loadCoursesWorker() {
  try {
    yield put({type: actionTypes.LOADING_COURSES_STARTED});
    const courses = yield call(ApiService.load, '/courses');
    yield put({type: actionTypes.LOADING_COURSES_SUCCESS, payload: {courses}});
  } catch (error) {
    yield put({type: actionTypes.LOADING_COURSES_FAILED, payload: {error: error.message}});
  }
}

function* createCourseWorker(data) {
  try {
    yield put({type: actionTypes.CREATING_COURSE_STARTED});
    const course = yield call(ApiService.create, '/courses', data.payload.course);
    yield put({type: actionTypes.CREATING_COURSE_SUCCESS, payload: {course}});
  } catch (error) {
    yield put({type: actionTypes.CREATING_COURSE_FAILED, payload: {error: error.message}});
  }
}

function* editCourseWorker(data) {
  try {
    yield put({type: actionTypes.EDITING_COURSE_STARTED});
    const course = yield call(ApiService.update, `/courses/${data.payload.id}`, data.payload.course);
    yield put({type: actionTypes.EDITING_COURSE_SUCCESS, payload: {course}});
  } catch (error) {
    yield put({type: actionTypes.EDITING_COURSE_FAILED, payload: {error: error.message}});
  }
}

export function* coursesWatcher() {
  yield all([
    fork(loadCoursesWatcher),
    fork(createCourseWatcher),
    fork(editCourseWatcher),
  ]);
}
