import {
  all,
  fork,
  put,
  call,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import { ApiService } from '../../shared/api-service/api-service.js';
import * as actionTypes from './types.js';

export const getEvent = (id) => ({
  type: actionTypes.GET_EVENT,
  payload: { id },
});

export const updateEvent = (id) => ({
  type: actionTypes.UPDATE_EVENT,
  payload: { id },
});

export const deleteEvent = (id) => ({
  type: actionTypes.DELETE_EVENT,
  payload: { id },
});

export const connectEventToLesson = (id) => ({
  type: actionTypes.CONNECT_EVENT_TO_LESSON,
  payload: { id },
});

function* getEventWorker(data) {
  try {
    yield put({ type: actionTypes.LOADING_GET_EVENT_STARTED });

    const event = yield call(ApiService.load, `/events/${data.payload.id}`);

    yield put({
      type: actionTypes.LOADING_GET_EVENT_SUCCESS,
      payload: { event },
    });
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_GET_EVENT_FAILED,
      payload: { error },
    });
  }
}

function* updateEventWorker(data) {
  try {
    yield put({ type: actionTypes.LOADING_UPDATE_EVENT_STARTED });

    const event = yield call(ApiService.update, `/events/${data.payload.id}`);

    yield put({
      type: actionTypes.LOADING_UPDATE_EVENT_SUCCESS,
      payload: { event },
    });
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_UPDATE_EVENT_FAILED,
      payload: { error },
    });
  }
}

function* deleteEventWorker(data) {
  try {
    yield put({ type: actionTypes.LOADING_DELETE_EVENT_STARTED });

    yield call(ApiService.delete, `/events/${data.payload.id}`);

    yield put({
      type: actionTypes.LOADING_DELETE_EVENT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_DELETE_EVENT_FAILED,
      payload: { error },
    });
  }
}

function* connectEventToLessonWorker(data) {
  try {
    yield put({ type: actionTypes.LOADING_CONNECT_EVENT_STARTED });

    // "id" of scheduled event
    const event = yield call(
      ApiService.reactivate,
      `/events/${data.payload.id}`
    );

    yield put({
      type: actionTypes.LOADING_CONNECT_EVENT_SUCCESS,
      payload: { event },
    });
  } catch (error) {
    yield put({
      type: actionTypes.LOADING_CONNECT_EVENT_FAILED,
      payload: { error },
    });
  }
}

function* getEventWatcher() {
  yield takeLatest(actionTypes.GET_EVENT, getEventWorker);
}

function* updateEventWatcher() {
  yield takeEvery(actionTypes.UPDATE_EVENT, updateEventWorker);
}

function* deleteEventWatcher() {
  yield takeLatest(actionTypes.UPDATE_EVENT, deleteEventWorker);
}

function* connectEventToLessonWatcher() {
  yield takeEvery(
    actionTypes.CONNECT_EVENT_TO_LESSON,
    connectEventToLessonWorker
  );
}

export function* eventWatcher() {
  yield all([
    fork(getEventWatcher),
    fork(updateEventWatcher),
    fork(deleteEventWatcher),
    fork(connectEventToLessonWatcher),
  ]);
}
