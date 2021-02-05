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

export const clearLoaded = () => ({
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

export const forgotPassword = (data) => ({
  type: actionTypes.FORGOT_PASSWORD,
  payload: { data },
});

export const resetPassword = (id, data) => ({
  type: actionTypes.RESET_PASSWORD,
  payload: { id, data },
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
  } catch (error) {
    yield put({ type: actionTypes.REGIST_ERROR, payload: { error } });
  }
}

function* getAssignedUsersWorker() {
  try {
    yield put({ type: actionTypes.FETCH_ASSIGNED_STARTED });
    const usersList = yield call(ApiService.load, '/accounts');
    yield put({ type: actionTypes.FETCH_ASSIGNED_SUCCESS, payload: { usersList } });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_ASSIGNED_ERROR, payload: { error } });
  }
}

function* getUnAssignedUsersWorker() {
  try {
    yield put({ type: actionTypes.FETCH_UNASSIGNED_STARTED });
    const unAssigned = yield call(ApiService.load, '/accounts/NotAssigned');
    yield put({ type: actionTypes.FETCH_UNASSIGNED_SUCCESS, payload: { unAssigned } });
  } catch (error) {
    yield put({ type: actionTypes.FETCH_UNASSIGNED_ERROR, payload: { error } });
  }
}

function* changePasswordWorker({ payload }) {
  try {
    yield put({ type: actionTypes.NEW_PASSWORD_CREATING_STARTED });
    yield call(ApiService.update, '/accounts/password', payload.newData);
    yield put({ type: actionTypes.NEW_PASSWORD_CREATING_SUCCESS });
    yield put({ type: actionTypes.CLEAR_LOADED });
  } catch (error) {
    yield put({ type: actionTypes.NEW_PASSWORD_CREATING_FAILED, payload: { error } });
  }
}

function* forgotPasswordWorker({ payload }) {
  try {
    yield put({ type: actionTypes.FORGOT_PASSWORD_REQUEST_STARTED });
    const data = yield call(ApiService.create, '/accounts/password/forgot', payload.data);
    yield put({ type: actionTypes.FORGOT_PASSWORD_REQUEST_SUCCESS, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.FORGOT_PASSWORD_REQUEST_FAILED, payload: { error } });
  }
}

function* resetPasswordWorker({ payload }) {
  try {
    yield put({ type: actionTypes.RESET_PASSWORD_REQUEST_STARTED });
    const data = yield call(ApiService.create, `/accounts/password/reset/${payload.id}`, payload.data);
    yield put({ type: actionTypes.RESET_PASSWORD_REQUEST_SUCCESS, payload: { data } });
  } catch (error) {
    yield put({ type: actionTypes.RESET_PASSWORD_REQUEST_FAILED, payload: { error } });
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

function* forgotPasswordWatcher() {
  yield takeEvery(actionTypes.FORGOT_PASSWORD, forgotPasswordWorker);
}

function* resetPasswordWatcher() {
  yield takeEvery(actionTypes.RESET_PASSWORD, resetPasswordWorker);
}

export function* authWatcher() {
  yield all([
    fork(loginWatcher),
    fork(logOutWatcher),
    fork(registrationWatcher),
    fork(fetchAssignedUserListWatcher),
    fork(fetchUnAssignedUserListWatcher),
    fork(changePasswordWatcher),
    fork(forgotPasswordWatcher),
    fork(resetPasswordWatcher),
  ]);
}
