import {
  put, call, takeLatest, fork, all, takeEvery,
} from 'redux-saga/effects';

import { ApiService } from '../../shared/index.js';
import * as actionsTypes from './action-types.js';

export const fetchLessons = () => ({
  type: actionsTypes.FETCH_LESSONS,
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
        error: error.message,
      },
    });
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
        error: error.message,
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
        error: error.message,
      },
    });
    yield put({ type: actionsTypes.CLEAR_ERROR });
  }
}

export function* fetchLessonsWatcher() {
  yield takeLatest(actionsTypes.FETCH_LESSONS, fetchLessonsAsync);
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
    fork(addLessonWatcher),
    fork(editLessonWatcher),
  ]);
}
