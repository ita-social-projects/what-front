import { ApiService } from '../../shared/api-service';
import { all, fork, put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionsTypes from './types.js';

export const fetchSchedules = () => {
  return {
    type: actionsTypes.FETCH_SCHEDULES,
  };
};

export const fetchGroupSchedule = (id) => {
  return {
    type: actionsTypes.FETCH_GROUP_SCHEDULE,
    payload: {
      id,
    },
  };
};

export const createSchedule = (schedule) => {
  return {
    type: actionsTypes.CREATE_SCHEDULE,
    payload: {
      schedule,
    },
  };
};

export const editSchedule = (schedule, id) => {
  return {
    type: actionsTypes.EDIT_SCHEDULE,
    payload: {
      schedule,
      id,
    },
  };
};

export const deleteSchedule = (id) => {
  return {
    type: actionsTypes.DELETE_SCHEDULE,
    payload: {
      id,
    },
  };
};

export function* fetchSchedulesWatcher() {
  yield takeLatest(actionsTypes.FETCH_SCHEDULES, fetchSchedulesWorker);
}

export function* fetchGroupScheduleWatcher() {
  yield takeLatest(actionsTypes.FETCH_GROUP_SCHEDULE, fetchGroupScheduleWorker);
}

export function* createScheduleWatcher() {
  yield takeEvery(actionsTypes.CREATE_SCHEDULE, createScheduleWorker);
}

export function* editScheduleWatcher() {
  yield takeEvery(actionsTypes.EDIT_SCHEDULE, editScheduleWorker);
}

export function* deleteScheduleWatcher() {
  yield takeEvery(actionsTypes.DELETE_SCHEDULE, deleteScheduleWorker);
}

function* fetchSchedulesWorker() {
  try {
    yield put({type: actionsTypes.LOADING_SCHEDULES_STARTED});
    const schedules = yield call(ApiService.load, '/schedules');
    yield put({type: actionsTypes.LOADING_SCHEDULES_SUCCESS, payload: {schedules}});
  } catch (error) {
    yield put({type: actionsTypes.LOADING_SCHEDULES_FAILED, payload: {error: error.message}});
  }
}

function* fetchGroupScheduleWorker(data) {
  try {
    yield put({type: actionsTypes.LOADING_GROUP_SCHEDULE_STARTED});
    const schedule = yield call(ApiService.load, `/schedules/${data.payload.id}/groupSchedule`);
    yield put({type: actionsTypes.LOADING_GROUP_SCHEDULE_SUCCESS, payload: {schedule}});
  } catch (error) {
    yield put({type: actionsTypes.LOADING_GROUP_SCHEDULE_FAILED, payload: {error: error.message}});
  }
}

function* createScheduleWorker(data) {
  try {
    yield put({type: actionsTypes.CREATING_SCHEDULE_STARTED});
    const schedule = yield call(ApiService.create, '/schedules', data.payload.schedule);
    yield put({type: actionsTypes.CREATING_SCHEDULE_SUCCESS, payload: {schedule}});
  } catch (error) {
    yield put({type: actionsTypes.CREATING_SCHEDULE_FAILED, payload: {error: error.message}});
  }
}

function* editScheduleWorker(data) {
  try {
    yield put({type: actionsTypes.EDITING_SCHEDULE_STARTED});
    const schedule = yield call(ApiService.update, `/schedules/${data.payload.id}`, data.payload.schedule);
    yield put({type: actionsTypes.EDITING_SCHEDULE_SUCCESS, payload: {schedule}});
  } catch (error) {
    yield put({type: actionsTypes.EDITING_SCHEDULE_FAILED, payload: {error: error.message}});
  }
}

function* deleteScheduleWorker(data) {
  try {
    yield put({type: actionsTypes.DELETING_SCHEDULE_STARTED});
    const schedule = yield call(ApiService.remove, `/schedules/${data.payload.id}`);
    yield put({type: actionsTypes.DELETING_SCHEDULE_SUCCESS, payload: {schedule}});
  } catch (error) {
    yield put({type: actionsTypes.DELETING_SCHEDULE_FAILED, payload: {error: error.message}});
  }
}

export function* schedulesWatcher() {
  yield all([
    fork(fetchSchedulesWatcher),
    fork(fetchGroupScheduleWatcher),
    fork(createScheduleWatcher),
    fork(editScheduleWatcher),
    fork(deleteScheduleWatcher),
  ])
}