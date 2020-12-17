import {
  put, call, takeLatest, all, fork, takeEvery,
} from 'redux-saga/effects';

import { Cookie } from '@/utils/index.js';
import * as actionTypes from './types.js';
import { ApiService } from '../../shared/index.js';

export const login = (currentUser) => ({
  type: actionTypes.LOGIN_REQUESTING,
  payload: {
    currentUser,
  },
});

export const registration = (newUser) => ({
  type: actionTypes.REGIST_REQUSTING,
  payload: {
    newUser,
  },
});

export const clearRegistration = () => ({
  type: actionTypes.CLEAR_LOADED,
});

export const fetchUsersList = () => ({
  type: actionTypes.FETCH_ASSIGNED,
});

export const fetchUnAssignedUserList = () => ({
  type: actionTypes.FETCH_UNASSIGNED,
});

export const logOut = () => ({
  type: actionTypes.LOGOUT,
});

function* logingWorker(data) {
  try {
    yield put({ type: actionTypes.LOGIN_STARTED });
    const logUser = yield call(ApiService.create, '/accounts/auth', data.payload.currentUser);
    yield call(Cookie.set, 'user', JSON.stringify(logUser), 1);
    yield put({ type: actionTypes.LOGIN_SUCCESS, payload: { logUser } });
  } catch (error) {
    yield put({ type: actionTypes.LOGIN_ERROR, payload: { error: error.message } });
  }
}

function* logOutWorker() {
  yield call(Cookie.del, 'user');
  yield call(Cookie.del, 'jwt');
  yield put({ type: actionTypes.CLEAR_USER });
}

function* registrationWorker(data) {
  try {
    yield put({ type: actionTypes.REGIST_STARTED});
    const regUser = yield call(ApiService.create, '/accounts/reg', data.payload.newUser);
    yield put({ type: actionTypes.REGIST_SUCCESS, payload: { regUser } });
    // yield put({type: actionTypes.CLEAR_LOADED});
  } catch (error) {
    yield put({ type: actionTypes.REGIST_ERROR, payload: { error: error.message } });
  }
}

function* getAssigenUsersWorker() {
  try {
    yield put({ type: actionTypes.FETCH_ASSIGNED_STARTED });
    const usersList = yield call(ApiService.load, '/accounts');
    yield put({ type: actionTypes.FETCH_ASSIGNED_SUCCESS, payload: { usersList } });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_ASSIGNED_ERROR, payload: { error: error.message } });
  }
}

function* getUnAssigenUsersWorker() {
  try {
    yield put({ type: actionTypes.FETCH_UNASSIGNED_STARTED });
    const unAssigned = yield call(ApiService.load, '/accounts/NotAssigned');
    yield put({ type: actionTypes.FETCH_UNASSIGNED_SUCCESS, payload: { unAssigned } });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_UNASSIGNED_ERROR, payload: { error: error.message } });
  }
}

function* loginWtacher() {
  yield takeLatest(actionTypes.LOGIN_REQUESTING, logingWorker);
}

function* logOutWatcher() {
  yield takeEvery(actionTypes.LOGOUT, logOutWorker);
}

function* registrationWather() {
  yield takeLatest(actionTypes.REGIST_REQUSTING, registrationWorker);
}

function* fetchAssignedUserListWatcher() {
  yield takeLatest(actionTypes.FETCH_ASSIGNED, getAssigenUsersWorker);
}
function* fetchUnAssignedUserListWatcher() {
  yield takeLatest(actionTypes.FETCH_UNASSIGNED, getUnAssigenUsersWorker);
}

export function* authWatcher() {
  yield all([
    fork(loginWtacher),
    fork(logOutWatcher),
    fork(registrationWather),
    fork(fetchAssignedUserListWatcher),
    fork(fetchUnAssignedUserListWatcher),
  ]);
}
