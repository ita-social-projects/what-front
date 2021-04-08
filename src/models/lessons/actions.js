import {
  put, call, takeLatest, fork, all, takeEvery,
} from 'redux-saga/effects';

import { ApiService } from '../../shared/index.js';
import * as actionsTypes from './action-types.js';

export const fetchLessons = () => ({
  type: actionsTypes.FETCH_LESSONS,
});

export const fetchLessonsByStudentId = (id) => ({
  type: actionsTypes.LOAD_LESSON_BY_ID,
  payload: { id },
});

export const addLesson = (data) => ({
  type: actionsTypes.ADD_LESSON,
  payload: {
    data,
  },
});

export const editLesson = (data, id) => ({
  type: actionsTypes.EDIT_LESSON,
  payload: {
    data,
    id,
  },
});

function* fetchLessonsAsync() {
  try {
    yield put({ type: actionsTypes.LOADING_LESSONS_STARTED });

    const data = yield call(ApiService.load, '/lessons');

    yield put({
      type: actionsTypes.LOADING_LESSONS_FINISHED,
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: actionsTypes.LOADING_LESSONS_FAILED,
      payload: {
        error,
      },
    });
  }
}

function* fetchLessonsByStudentIdAsync({ payload }) {
  try {
    yield put({ type: actionsTypes.LOADING_BY_ID_STARTED });

    const studentId = payload.id;
    const data = yield call(ApiService.load, `/students/${studentId}/lessons`);

    yield put({ type: actionsTypes.LOADING_BY_ID_SUCCEED, payload: { data } });
  } catch (error) {
    yield put({ type: actionsTypes.LOADING_BY_ID_FAILED, payload: { error } });
  }
}

function* addLessonAsync(lessonData) {
  try {
    yield put({ type: actionsTypes.ADDING_STARTED });

    const data = yield call(ApiService.create, '/lessons', lessonData.payload.data);

    yield put({
      type: actionsTypes.ADDING_FINISHED,
      payload: {
        data,
      },
    });

    yield put({ type: actionsTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionsTypes.ADDING_FAILED,
      payload: {
        error,
      },
    });
    yield put({ type: actionsTypes.CLEAR_ERROR });
  }
}

function* editLessonAsync(editData) {
  try {
    yield put({ type: actionsTypes.EDITING_STARTED });

    const data = yield call(ApiService.update, `/lessons/${editData.payload.id}`, editData.payload.data);

    yield put({
      type: actionsTypes.EDITING_FINISHED,
      payload: {
        data,
      },
    });

    yield put({ type: actionsTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({
      type: actionsTypes.EDITING_FAILED,
      payload: {
        error,
      },
    });
    yield put({ type: actionsTypes.CLEAR_ERROR });
  }
}

export function* fetchLessonsWatcher() {
  yield takeLatest(actionsTypes.FETCH_LESSONS, fetchLessonsAsync);
}

function* fetchLessonsByStudentIdWatcher() {
  yield takeLatest(actionsTypes.LOAD_LESSON_BY_ID, fetchLessonsByStudentIdAsync);
}

export function* addLessonWatcher() {
  yield takeEvery(actionsTypes.ADD_LESSON, addLessonAsync);
}

export function* editLessonWatcher() {
  yield takeEvery(actionsTypes.EDIT_LESSON, editLessonAsync);
}

export function* lessonsWatcher() {
  yield all([
    fork(fetchLessonsWatcher),
    fork(fetchLessonsByStudentIdWatcher),
    fork(addLessonWatcher),
    fork(editLessonWatcher),
  ]);
}
