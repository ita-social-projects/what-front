import { ApiService } from '../../shared/api-service';
import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionTypes from './types.js';

export const fetchSchedules = () => {
  return {
    type: actionTypes.FETCH_SCHEDULES,
  };
};

export const createSchedule = (schedule) => {
  return {
    type: actionTypes.CREATE_SCHEDULE,
    payload: {
      schedule,
    },
  };
};

export const editSchedule = (schedule, id) => {
  return {
    type: actionTypes.EDIT_SCHEDULE,
    payload: {
      schedule,
      id,
    },
  };
};

export const deleteSchedule = (id) => {
  return {
    type: actionTypes.DELETE_SCHEDULE,
    payload: {
      id,
    },
  };
};

function* fetchSchedulesWatcher() {
  yield takeLatest(actionTypes.FETCH_SCHEDULES, fetchSchedulesWorker);
}

function* createScheduleWatcher() {
  yield takeEvery(actionTypes.CREATE_SCHEDULE, createScheduleWorker);
}

function* editScheduleWatcher() {
  yield takeEvery(actionTypes.EDIT_SCHEDULE, editScheduleWorker);
}

function* deleteScheduleWatcher() {
  yield takeEvery(actionTypes.DELETE_SCHEDULE, deleteScheduleWorker);
}

function* fetchSchedulesWorker() {
  try {
    yield put({type: actionTypes.LOADING_SCHEDULES_STARTED});
    const schedules = yield call(ApiService.load, '/schedules');
    yield put({type: actionTypes.LOADING_SCHEDULES_SUCCESS, payload: {schedules}});
  } catch (error) {
    yield put({type: actionTypes.LOADING_SCHEDULES_FAILED, payload: {error: error.message}});
  }
}

function* createScheduleWorker(data) {
  try {
    yield put({type: actionTypes.CREATING_SCHEDULE_STARTED});
    const schedule = yield call(ApiService.create, '/schedules', data.payload.schedule);
    yield put({type: actionTypes.CREATING_SCHEDULE_SUCCESS, payload: {schedule}});
    yield put({type: actionTypes.CLEAR_LOADED});
  } catch (error) {
    yield put({type: actionTypes.CREATING_SCHEDULE_FAILED, payload: {error: error.message}});
  }
}

function* editScheduleWorker(data) {
  try {
    yield put({type: actionTypes.EDITING_SCHEDULE_STARTED});
    const schedule = yield call(ApiService.update, `/schedules/${data.payload.id}`, data.payload.schedule);
    yield put({type: actionTypes.EDITING_SCHEDULE_SUCCESS, payload: {schedule}});
    yield put({type: actionTypes.CLEAR_LOADED});
  } catch (error) {
    yield put({type: actionTypes.EDITING_SCHEDULE_FAILED, payload: {error: error.message}});
  }
}

function* deleteScheduleWorker(data) {
  try {
    yield put({type: actionTypes.DELETING_SCHEDULE_STARTED});
    const schedule = yield call(ApiService.remove, `/schedules/${data.payload.id}`);
    yield put({type: actionTypes.DELETING_SCHEDULE_SUCCESS, payload: {schedule}});
    yield put({type: actionTypes.CLEAR_LOADED});
  } catch (error) {
    yield put({type: actionTypes.DELETING_SCHEDULE_FAILED, payload: {error: error.message}});
  }
}

export function* schedulesWatcher() {
  yield all([
    fork(fetchSchedulesWatcher),
    fork(createScheduleWatcher),
    fork(editScheduleWatcher),
    fork(deleteScheduleWatcher),
  ]);
}