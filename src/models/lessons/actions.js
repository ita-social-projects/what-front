import {
  put, call, takeLatest, fork, all,
} from 'redux-saga/effects';
import * as actionsTypes from './action-types.js';

import { ApiService } from '../index.js';

export const fetchLessons = () => ({
  type: actionsTypes.FETCH_LESSONS,
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

export function* fetchLessonsWatcher() {
  yield takeLatest(actionsTypes.FETCH_LESSONS, fetchLessonsAsync);
}

export const fetchStudentLessons = (id) => ({
  type: actionsTypes.FETCH_STUDENT_LESSONS,
  payload: {
    id,
  },
});

function* fetchStudentLessonsAsync(lessonData) {
  try {
    yield put({ type: actionsTypes.LOADING_STUDENT_LESSONS_STARTED });

    const data = yield call(ApiService.load, `/lessons/students/${lessonData.payload.id}`);

    yield put({
      type: actionsTypes.LOADING_STUDENT_LESSONS_FINISHED,
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: actionsTypes.LOADING_STUDENT_LESSONS_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* fetchStudentLessonsWatcher() {
  yield takeLatest(actionsTypes.FETCH_STUDENT_LESSONS, fetchStudentLessonsAsync);
}

export const addLesson = (data) => ({
  type: actionsTypes.ADD_LESSON,
  payload: {
    data,
  },
});

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
  } catch (error) {
    yield put({
      type: actionsTypes.ADDING_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* addLessonWatcher() {
  yield takeLatest(actionsTypes.ADD_LESSON, addLessonAsync);
}

export const assignLesson = (data) => ({
  type: actionsTypes.ASSIGN_LESSON,
  payload: {
    data,
  },
});

function* assignLessonAsync(assignData) {
  try {
    yield put({ type: actionsTypes.ADDING_STARTED });

    const data = yield call(ApiService.create, '/lessons/assign', assignData.payload.data);

    yield put({
      type: actionsTypes.ASSIGN_FINISHED,
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: actionsTypes.ASSIGN_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* assignLessonWatcher() {
  yield takeLatest(actionsTypes.ASSIGN_LESSON, assignLessonAsync);
}

export const editLesson = (data, id) => ({
  type: actionsTypes.EDIT_LESSON,
  payload: {
    data,
    id,
  },
});

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
  } catch (error) {
    yield put({
      type: actionsTypes.EDITING_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* editLessonWatcher() {
  yield takeLatest(actionsTypes.EDIT_LESSON, editLessonAsync);
}

export function* lessonsWatcher() {
  yield all([
    fork(fetchLessonsWatcher),
    fork(fetchStudentLessonsWatcher),
    fork(addLessonWatcher),
    fork(assignLessonWatcher),
    fork(editLessonWatcher),
  ]);
}