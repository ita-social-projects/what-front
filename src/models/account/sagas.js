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

export const newPassword = (newData) => ({
  type: actionTypes.NEW_PASSWORD,
  payload: { newData },
});

function* loginWorker({ payload }) {
  try {
    yield put({ type: actionTypes.LOGIN_STARTED });
    const logUser = yield call(ApiService.create, '/accounts/auth', payload.currentUser);
    logUser.email = payload.currentUser.email;
    yield call(Cookie.set, 'user', JSON.stringify(logUser), 1);
    yield put({ type: actionTypes.LOGIN_SUCCESS, payload: { logUser } });
  } catch (error) {
    yield put({ type: actionTypes.LOGIN_ERROR, payload: { error } });
  }
}

function* logOutWorker() {
  yield call(Cookie.del, 'user');
  yield call(Cookie.del, 'jwt');
  yield put({ type: actionTypes.CLEAR_USER });
}

function* registrationWorker(data) {
  try {
    yield put({ type: actionTypes.REGIST_STARTED });
    const regUser = yield call(ApiService.create, '/accounts/reg', data.payload.newUser);
    yield put({ type: actionTypes.REGIST_SUCCESS, payload: { regUser } });
    // yield put({type: actionTypes.CLEAR_LOADED});
  } catch (error) {
    yield put({ type: actionTypes.REGIST_ERROR, payload: { error: error.message } });
  }
}

function* getAssignedUsersWorker() {
  try {
    yield put({ type: actionTypes.FETCH_ASSIGNED_STARTED });
    const usersList = yield call(ApiService.load, '/accounts');
    yield put({ type: actionTypes.FETCH_ASSIGNED_SUCCESS, payload: { usersList } });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_ASSIGNED_ERROR, payload: { error: error.message } });
  }
}

function* getUnAssignedUsersWorker() {
  try {
    yield put({ type: actionTypes.FETCH_UNASSIGNED_STARTED });
    const unAssigned = yield call(ApiService.load, '/accounts/NotAssigned');
    yield put({ type: actionTypes.FETCH_UNASSIGNED_SUCCESS, payload: { unAssigned } });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_UNASSIGNED_ERROR, payload: { error: error.message } });
  }
}

function* changePasswordWorker({ payload }) {
  try {
    yield put({ type: actionTypes.NEW_PASSWORD_CREATING_STARTED });
    yield call(ApiService.create, '/accounts/ChangePassword', payload.newData);
    yield put({ type: actionTypes.NEW_PASSWORD_CREATING_SUCCESS });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.NEW_PASSWORD_CREATING_FAILED, payload: { error } });
  }
}

function* loginWatcher() {
  yield takeLatest(actionTypes.LOGIN_REQUESTING, loginWorker);
}

function* logOutWatcher() {
  yield takeEvery(actionTypes.LOGOUT, logOutWorker);
}

function* registrationWatcher() {
  yield takeLatest(actionTypes.REGIST_REQUSTING, registrationWorker);
}

function* fetchAssignedUserListWatcher() {
  yield takeLatest(actionTypes.FETCH_ASSIGNED, getAssignedUsersWorker);
}

function* fetchUnAssignedUserListWatcher() {
  yield takeLatest(actionTypes.FETCH_UNASSIGNED, getUnAssignedUsersWorker);
}

function* changePasswordWatcher() {
  yield takeEvery(actionTypes.NEW_PASSWORD, changePasswordWorker);
}

export function* authWatcher() {
  yield all([
    fork(loginWatcher),
    fork(logOutWatcher),
    fork(registrationWatcher),
    fork(fetchAssignedUserListWatcher),
    fork(fetchUnAssignedUserListWatcher),
    fork(changePasswordWatcher),
  ]);
}
