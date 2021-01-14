import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { ApiService } from '../../shared/api-service';
import * as actionTypes from './types';

export const fetchCourses = () => ({
  type: actionTypes.FETCH_COURSES,
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

export const deleteCourse = (id) => {
  return {
    type: actionTypes.DELETE_COURSE,
    payload: {
      id,
    },
  };
};

function* loadCoursesWorker() {
  try {
    yield put({ type: actionTypes.LOADING_COURSES_STARTED });
    const courses = yield call(ApiService.load, '/courses');
    yield put({ type: actionTypes.LOADING_COURSES_SUCCESS, payload: { courses } });
  } catch (error) {
    yield put({ type: actionTypes.LOADING_COURSES_FAILED, payload: { error: error.message } });
  }
}

function* createCourseWorker(data) {
  try {
    yield put({ type: actionTypes.CREATING_COURSE_STARTED });
    const course = yield call(ApiService.create, '/courses', data.payload.course);
    yield put({ type: actionTypes.CREATING_COURSE_SUCCESS, payload: { course } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.CREATING_COURSE_FAILED, payload: { error: error.message } });
  }
}

function* editCourseWorker(data) {
  try {
    yield put({ type: actionTypes.EDITING_COURSE_STARTED });
    const course = yield call(ApiService.update, `/courses/${data.payload.id}`, data.payload.course);
    yield put({ type: actionTypes.EDITING_COURSE_SUCCESS, payload: { course } });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.EDITING_COURSE_FAILED, payload: { error: error.message } });
    yield put({ type: actionTypes.EDITING_CLEAR_ERROR });
  }
}

function* deleteCourseWorker(data) {
  try {
    yield put({type: actionTypes.DELETING_COURSE_STARTED});
    yield call(ApiService.remove, `/courses/${data.payload.id}`);
    yield put({type: actionTypes.DELETING_COURSE_SUCCESS});
    yield put({type: actionTypes.CLEAR_LOADED});
  } catch (error) {
    yield put({type: actionTypes.DELETING_COURSE_FAILED, payload: {error: error.message}});
  }
}

function* fetchCoursesWatcher() {
  yield takeLatest(actionTypes.FETCH_COURSES, loadCoursesWorker);
}

function* createCourseWatcher() {
  yield takeEvery(actionTypes.CREATE_COURSE, createCourseWorker);
}

function* editCourseWatcher() {
  yield takeEvery(actionTypes.EDIT_COURSE, editCourseWorker);
}

function* deleteCourseWatcher() {
  yield takeEvery(actionTypes.DELETE_COURSE, deleteCourseWorker)
}

export function* coursesWatcher() {
  yield all([
    fork(fetchCoursesWatcher),
    fork(createCourseWatcher),
    fork(editCourseWatcher),
    fork(deleteCourseWatcher)
  ]);
}
